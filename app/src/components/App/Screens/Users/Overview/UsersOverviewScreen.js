import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { RealtorRoutes, route, UserRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import { formatName } from "../../../../../core/modules/users/utils";
import Button from "../../../../Design/Buttons/Button";
import Title from "../../../../Design/Typography/Title";
import PageHeader from "../../../../Design/PageHeader";
import useTitle from "../../../../../core/hooks/useTitle";
import { useUser } from "../../../Auth/AuthProvider";
import Label from "../../../../Design/Form/Label";

const UsersOverviewScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data: users, error } = useFetch("/users");

    const userInfo = useUser();

    useTitle(t("Users"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    let userNew;
    let userDetail;
    let link;

    if(userInfo){
        if(userInfo.role === "ADMIN"){
            userNew = UserRoutes.New;
            userDetail = UserRoutes.Detail;
            
        }
        else {
            userNew = RealtorRoutes.New;
            userDetail = RealtorRoutes.Detail;
        }
    }

    return (
        <>
            <PageHeader>
                <Title>{t("Users")}</Title>
                <Button href={userNew}>
                    {t("Add a new user")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th>{t("ID")}</th>
                        <th>{t("Name")}</th>
                        <th>{t("Email")}</th>
                        <th>{t("Role")}</th>
                    </TableHeader>
                }>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            {userInfo.role === "ADMIN" && (
                                <Link
                                    to={route(userDetail, {
                                        id: user.id,
                                    })}>
                                    {formatName(user)}
                                </Link>
                            )}

                            {userInfo.role === "REALTOR" && (
                                <Label>
                                    {formatName(user)}
                                </Label>
                            )}
                            
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default UsersOverviewScreen;
