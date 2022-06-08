import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { LogRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import LogForm from "../../../Shared/Logs/Form/LogForm";

const LogAddScreen = () => {
    const { t } = useTranslation();
    const user = useUser();
    const navigate = useNavigate();

    useTitle(t("logs.create.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/logs`, {
            method: "POST",
            data,
            onSuccess: () => {
                navigate(LogRoutes.Index);
            },
        });
    };

    return (
        <>
            <BackButton href={route(LogRoutes.Index)} />
            <PageHeader>
                <Title>{t("logs.create.title")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <LogForm
                label={t("buttons.create")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                options={{
                    showUser: isAdmin(user),
                }}
            />
        </>
    );
};

export default LogAddScreen;
