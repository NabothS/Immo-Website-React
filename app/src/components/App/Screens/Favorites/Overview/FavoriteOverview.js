import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link, useNavigate } from "react-router-dom";
import { BuildingRoutes, FavoriteRoutes, route } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";
import { useUser } from "../../../Auth/AuthProvider";

const FavoritesOverviewScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { isLoading, data: favorites, error, invalidate } = useFetch("/favorites");

  const {
    data: user,
    // refresh,
  } = useFetch(`/users/${useUser().id}`);

  useTitle(t("Favorites"));

  const handleFavoriteDelete = () => {
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
        <Title>{t("Your Favorites")}</Title>
      </PageHeader>
      <Table
        header={
          <TableHeader>
            <th>{t("Image")}</th>
            <th>{t("Link")}</th>
            <th>{t("Remove From Favorites")}</th>
          </TableHeader>
        }
      >
        {favorites.map((favorite) => (
          <TableRow key={favorite.id}>
            <td>
                {!isVoid(favorite.building.avatar) && (
                <img
                  style={{ width: "6rem", height: "3.5rem" }}
                  src={getImagePath(favorite.building.avatar)}
                  alt={favorite.building.name}
                />
              )}
            </td>
            <td>
                <Link
                    to={route(BuildingRoutes.Detail, {
                    id: favorite.building.id,
                    })}
                >
                    {"Go to the house"}
                </Link>
            </td>
            <td>
                <DeleteButton
                  size="sm"
                  id={favorite.id}
                  scope="favorites"
                  onSuccess={handleFavoriteDelete}
                />
            </td>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default FavoritesOverviewScreen;
