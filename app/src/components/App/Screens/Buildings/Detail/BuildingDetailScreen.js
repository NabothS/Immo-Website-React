import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { BuildingRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import Button from "../../../../Design/Buttons/Button";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import CreateEditLogDialog from "../../../Shared/Logs/Form/CreateEditLogDialog";
import LogsTable from "../../../Shared/Logs/Table/LogsTable";

const BuildingDetailScreen = () => {
    const { t } = useTranslation();
    const [currentLog, setCurrentLog] = useState();
    const user = useUser();
    const { building, onBuildingUpdate } = useOutletContext();

    useTitle(t(building ? building.name : ""));

    const handleAddLogClick = () => {
        setCurrentLog({
            buildingId: building.id,
        });
    };

    const handleUpdate = () => {
        setCurrentLog(null);
        onBuildingUpdate();
    };

    return (
        <>
            <BackButton href={route(BuildingRoutes.Index)} />
            <PageHeader>
                <Title>{'Test'}</Title>
                <Button href={route(BuildingRoutes.Edit, { id: building.id })}>
                    {t("buttons.edit")}
                </Button>
            </PageHeader>
            <p>{building.office?.name}</p>

            <PageHeader>
                <h2 className="mt-4">Logs</h2>
                <Button color="secondary" onClick={handleAddLogClick}>
                    {t("Add Building")}
                </Button>
            </PageHeader>
            <LogsTable
                logs={building.logs}
                options={{
                    showUser: isAdmin(user),
                    showProject: false,
                }}
                onRefresh={handleUpdate}
            />
            {currentLog && (
                <CreateEditLogDialog
                    log={currentLog}
                    onSuccess={handleUpdate}
                    options={{
                        showUser: isAdmin(user),
                        showProject: false,
                    }}
                    onDismiss={() => setCurrentLog(null)}
                />
            )}
        </>
    );
};

export default BuildingDetailScreen;
