import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link, useNavigate } from "react-router-dom";
import { BuildingRoutes, route } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { FaHeart } from "react-icons/fa";
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";
import { useUser } from "../../../Auth/AuthProvider";
import Capitalize from "../../../../../core/helpers/capitalize";
import useMutation from "../../../../../core/hooks/useMutation";

const BuildingsOverviewScreen = () => {
  const { t } = useTranslation();

  const { mutate } = useMutation();
  const navigate = useNavigate();

  const {
    isLoading,
    data: buildings,
    error,
    invalidate,
  } = useFetch("/buildings");

  const user = useUser();

  useTitle(t("Buildings"));

  const handleBuildingDelete = () => {
    invalidate();
  };

  const handleFavorite = (userId, buildingId) => {
    let data = {
      userId: userId,
      buildingId: buildingId,
    };

    mutate(`${process.env.REACT_APP_API_URL}/favorites`, {
      method: "POST",
      data,
      onSuccess: () => {
        navigate(BuildingRoutes.Index);
      },
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <PageHeader>
        <Title>{t("All Buildings")}</Title>
        {user.role !== "USER" && (
          <Button href={BuildingRoutes.New}>{t("Add new building")}</Button>
        )}
      </PageHeader>
      <Table
        header={
          <TableHeader>
            <th>{t("Image")}</th>
            <th>{t("Type")}</th>
            <th>{t("Rent or For Sale")}</th>
            <th>{t("Real Estate Office")}</th>
            <th>{t("Adress")}</th>
            <th>{t("Link")}</th>
            {user.role !== "USER" && <th>{t("Delete")}</th>}
            {user.role === "USER" && <th>{t("Favorite")}</th>}
          </TableHeader>
        }
      >
        {buildings.map((building) => (
          <TableRow key={building.id}>
            <td>
              {!isVoid(building.avatar) && (
                <img
                  style={{ width: "15rem", height: "10rem" }}
                  src={getImagePath(building.avatar)}
                  alt={building.name}
                />
              )}
            </td>

            <td>{building.category.name}</td>

            <td>{Capitalize(building.buy_rent)}</td>

            {building.office && <td>{building.office.name}</td>}
            {!building.office && <td>{t("Nothing to see here")}</td>}

            <td>
              {Capitalize(building.street) +
                " " +
                building.number +
                " " +
                building.city}
            </td>

            {user.role !== "USER" && (
              <td>
                <DeleteButton
                  size="sm"
                  scope="buildings"
                  id={building.id}
                  onSuccess={handleBuildingDelete}
                />
              </td>
            )}

            <td>
              <Link
                to={route(BuildingRoutes.Detail, {
                  id: building.id,
                })}
              >
                {"Link to house"}
              </Link>
            </td>

            {user.role === "USER" && (
              <td>
                <Button
                  onClick={() => {
                    handleFavorite(user.id, building.id);
                  }}
                >
                  Voeg toe aan <FaHeart />
                </Button>
              </td>
            )}
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default BuildingsOverviewScreen;
