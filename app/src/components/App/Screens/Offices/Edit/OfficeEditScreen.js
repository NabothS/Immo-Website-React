import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { OfficeRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import OfficeForm from "../../../Shared/Offices/Form/OfficeForm";

const OfficeEditScreen = () => {
    const { t } = useTranslation();
    const { office, onOfficeUpdate } = useOutletContext();
    const navigate = useNavigate();

    useTitle(t("Edit"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/offices`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                onOfficeUpdate();
                navigate(route(OfficeRoutes.Detail, { id: office.id }));
            },
        });
    };

    return (
        <>
            <BackButton href={route(OfficeRoutes.Index, { id: office.id })} />
            <PageHeader>
                <Title>{t("Edit Office")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <OfficeForm
                label={t("Save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={office}
            />
        </>
    );
};

export default OfficeEditScreen;
