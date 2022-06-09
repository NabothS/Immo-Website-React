import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { BuildingRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import BuildingForm from "../../../Shared/Buildings/Form/BuildingForm";

const BuildingEditScreen = () => {
    const { t } = useTranslation();
    const { building, onBuildingUpdate } = useOutletContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    useTitle(t("Edit"));

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/buildings`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                onBuildingUpdate();
                navigate(route(BuildingRoutes.Detail, { id: building.id }));
            },
        });
    };

    return (
        <>
            <BackButton
                href={route(BuildingRoutes.Detail, { id: building.id })}
            />
            <PageHeader>
                <Title>{t("Edit Building")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <BuildingForm
                label={t("Save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={building}
            />
        </>
    );
};

export default BuildingEditScreen;
