import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link, useNavigate } from "react-router-dom";
import { FavoriteRoutes, route } from "../../../../../core/routing";
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

const OfficesOverviewScreen = () => {
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
        <Title>{t("Real Estate Offices")}</Title>

        <Button href={FavoriteRoutes.New}>{t("Create")}</Button>
      </PageHeader>
      <Table
        header={
          <TableHeader>
            <th>{t("Test")}</th>
            <th></th>
          </TableHeader>
        }
      >
        {favorites.map((favorite) => (
          <TableRow key={favorite.id}>
            <td>favorite.user.name</td>
            <td>
                <DeleteButton
                  size="sm"
                  id={favorite.id}
                  scope="offices"
                  onSuccess={handleFavoriteDelete}
                />
            </td>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default OfficesOverviewScreen;
