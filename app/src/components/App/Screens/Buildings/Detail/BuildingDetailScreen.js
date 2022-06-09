import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import isVoid from "../../../../../core/helpers/isVoid";
import useTitle from "../../../../../core/hooks/useTitle";
import { BuildingRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
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
            {!isVoid(building.avatar) && (
                <img
                    style={{ width: "20rem", height: "20rem" }}
                    src={getImagePath(building.avatar)}
                    alt={building.name}
                />
            )}
            <Link to={route(BuildingRoutes.Edit, { id: building.id })}>
                {t("Edit")}
            </Link>
        </>
    );
};

export default BuildingDetailScreen;
