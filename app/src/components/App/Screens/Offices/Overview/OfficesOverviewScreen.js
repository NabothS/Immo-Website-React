import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link, useNavigate } from "react-router-dom";
import { OfficeRoutes, route } from "../../../../../core/routing";
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
  const { isLoading, data: offices, error, invalidate } = useFetch("/offices");

  const {
    data: user,
    // refresh,
  } = useFetch(`/users/${useUser().id}`);

  useTitle(t("Offices"));

  const handleOfficeDelete = () => {
    invalidate();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  let newOffices = [];

  if (user) {
    if (user.office != null) {
      offices.forEach((item) => {
        if (item.id === user.office.id) {
          newOffices.push(item);
        }
      });
    } else {
      newOffices = offices;
    }
  }

  let deleteForm;

  if (user) {
    if (user.role === "REALTOR") {
      deleteForm = "";
    }
  }

  return (
    <>
      <PageHeader>
        <Title>{t("Real Estate Offices")}</Title>

        <Button href={OfficeRoutes.New}>{t("Create")}</Button>
      </PageHeader>
      <Table
        header={
          <TableHeader>
            <th></th>
            <th>{t("Name")}</th>
            <th>{t("Contact")}</th>
            <th></th>
          </TableHeader>
        }
      >
        {newOffices.map((office) => (
          <TableRow key={office.id}>
            <td>
              {!isVoid(office.avatar) && (
                <img
                  style={{ width: "3rem", height: "3rem" }}
                  src={getImagePath(office.avatar)}
                  alt={office.name}
                />
              )}
            </td>
            <td>
              <Link
                to={route(OfficeRoutes.Detail, {
                  id: office.id,
                })}
              >
                {office.name}
              </Link>
            </td>
            <td>
              {office.contactPhone} ({office.contactEmail})
            </td>
            <td>
              {deleteForm !== "" && (
                <DeleteButton
                  size="sm"
                  id={office.id}
                  scope="offices"
                  onSuccess={handleOfficeDelete}
                />
              )}
            </td>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default OfficesOverviewScreen;
