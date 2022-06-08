import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { UserRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserEditScreen = () => {
    const { t } = useTranslation();
    const { user, onUserUpdate } = useOutletContext();
    const navigate = useNavigate();

    useTitle(t("users.edit.title"));

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            data,
            onSuccess: () => {
                onUserUpdate();
                navigate(route(UserRoutes.Detail, { id: user.id }));
            },
        });
    };

    return (
        <>
            <BackButton href={route(UserRoutes.Detail, { id: user.id })} />
            <PageHeader>
                <Title>{t("Edit user")}</Title>
            </PageHeader>
            {error && <Alert color="danger">{error}</Alert>}
            <UserForm
                label={t("Save")}
                disabled={isLoading}
                onSubmit={handleSubmit}
                initialData={user}
            />
        </>
    );
};

export default UserEditScreen;
