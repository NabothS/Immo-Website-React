import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import Capitalize from "../../../../../core/helpers/capitalize";
import isVoid from "../../../../../core/helpers/isVoid";
import useTitle from "../../../../../core/hooks/useTitle";
import { BuildingRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Div from "../../../../Design/Div/Div";
import Label from "../../../../Design/Form/Label";
import PageHeader from "../../../../Design/PageHeader";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Typography/Title";

const BuildingDetailScreen = () => {
  const { t } = useTranslation();
  const { building } = useOutletContext();

  useTitle(building ? building.name : "");

  return (
    <>
      <BackButton href={route(BuildingRoutes.Index)} />
      <PageHeader>
        <Title>{t("Detail of Building")}</Title>
      </PageHeader>
      <Div className={"divDetail"}>
        <Div>
          {!isVoid(building.avatar) && (
            <img
              style={{ width: "23rem", height: "15rem" }}
              src={getImagePath(building.avatar)}
              alt={building.office.name}
            />
          )}
        </Div>
        <Div>
          <Table
            header={
              <TableHeader className="tableHeadDetail">
                <th>{t("Type")}</th>
                <th>{t("Size")}</th>
                <th>{t("For Rent/Sale")}</th>
                <th>{t("Real Estate Office")}</th>
                <th>{t("Adress")}</th>
                <th>{t("Build Year")}</th>
                <th>{t("Sold?")}</th>
              </TableHeader>
            }
          >
            <TableRow className="tableRowDetail" key={building.id}>
              <td>{building.category.name}</td>

              <td>{building.size + "m³"}</td>

              <td>{Capitalize(building.buy_rent)}</td>

              <td>{building.office.name}</td>

              <td>
                {building.street +
                  " " +
                  building.number +
                  " | " +
                  building.city}
              </td>

              <td>{building.year}</td>

              {building.isSold == false && <td>{t("For Sale")}</td>}
              {building.isSold == true && <td>{t("Sold")}</td>}
            </TableRow>
          </Table>
        </Div>
      </Div>
      <Link to={route(BuildingRoutes.Edit, { id: building.id })}>
        {t("Edit")}
      </Link>
    </>
  );
};

export default BuildingDetailScreen;
