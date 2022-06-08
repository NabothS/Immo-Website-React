import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { LogRoutes } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../Auth/AuthProvider";
import LogsTable from "../../../Shared/Logs/Table/LogsTable";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import Button from "../../../../Design/Buttons/Button";
import { isAdmin } from "../../../../../core/modules/users/utils";
import useTitle from "../../../../../core/hooks/useTitle";

const LogsOverviewScreen = () => {
    const { t } = useTranslation();
    const user = useUser();
    const { isLoading, data: logs, error, invalidate } = useFetch("/logs");

    useTitle(t("logs.title"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("logs.overview.title")}</Title>
                <Button href={LogRoutes.New}>
                    {t("logs.overview.create")}
                </Button>
            </PageHeader>
            <LogsTable
                logs={logs}
                options={{
                    showUser: isAdmin(user),
                }}
                onRefresh={invalidate}
            />
        </>
    );
};

export default LogsOverviewScreen;
