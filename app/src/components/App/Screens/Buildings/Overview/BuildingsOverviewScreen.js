import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import {
  BuildingRoutes,
  OfficeRoutes,
  route,
} from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { AiOutlineStar } from 'react-icons/fa';
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";
import { useUser } from "../../../Auth/AuthProvider";
import Capitalize from "../../../../../core/helpers/capitalize";

const BuildingsOverviewScreen = () => {
  const { t } = useTranslation();

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
        <Button href={BuildingRoutes.New}>{t("Add new building")}</Button>
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
            {user.role !== "USER" && (
                <th>{t("Delete")}</th>
            )}
            {user.role === "USER" && (
                <th>{t("Favorite")}</th>
            )}
          </TableHeader>
        }
      >
        {buildings.map((building) => (
          <TableRow className="tableBuildings" key={building.id}>
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

            <td>{building.office.name}</td>

            <td>{Capitalize(building.street) + ' ' + building.number + ' ' +  building.city}</td>

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
                    <AiOutlineStar></AiOutlineStar>
                </td>
            )}
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default BuildingsOverviewScreen;
