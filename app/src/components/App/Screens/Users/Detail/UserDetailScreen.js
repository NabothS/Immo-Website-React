import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { formatName } from "../../../../../core/modules/users/utils";
import { UserRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const UserDetailScreen = () => {
    const { t } = useTranslation();
    const { user } = useOutletContext();

    useTitle(user ? formatName(user) : "");

    return (
        <>
            <BackButton href={route(UserRoutes.Index)} />
            <PageHeader>
                <Title>{user.name + ' ' + user.surname}</Title>
            </PageHeader>
            <p>{user.email}</p>
            <Link to={route(UserRoutes.Edit, { id: user.id })}>
                {t("Edit")}
            </Link>
        </>
    );
};

export default UserDetailScreen;
