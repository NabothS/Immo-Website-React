import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatName } from "../../../../../core/modules/users/utils";
import { BuildingRoutes, route } from "../../../../../core/routing";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Button from "../../../../Design/Buttons/Button";
import { BiPencil } from "react-icons/bi";
import DeleteButton from "../../Generic/Buttons/DeleteButton";
import CreateEditLogDialog from "../Form/CreateEditLogDialog";
import { useState } from "react";
import { format, parse } from "date-fns";
import { DATE_API_FORMAT } from "../../../../../core/modules/logs/constants";
import { formatMinutesToString } from "../../../../../core/modules/logs/utils";

const defaultOptions = {
    showUser: true,
    showProject: true,
};

const LogsTable = ({ logs, options = {}, onRefresh }) => {
    const [currentLog, setCurrentLog] = useState();
    const { t } = useTranslation();

    const handleDelete = () => {
        onRefresh();
    };

    const handleEditClick = (log) => {
        setCurrentLog(log);
    };

    const handleUpdate = () => {
        setCurrentLog(null);
        onRefresh();
    };

    options = { ...defaultOptions, ...options };

    return (
        <>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.date")}</th>
                        <th>{t("fields.time")}</th>
                        <th>{t("fields.description")}</th>
                        {options.showProject && <th>{t("fields.project")}</th>}
                        {options.showUser && <th>{t("fields.user")}</th>}
                        <th></th>
                    </TableHeader>
                }>
                {logs.map((log) => (
                    <TableRow key={log.id}>
                        <td>
                            {format(
                                parse(log.date, DATE_API_FORMAT, new Date()),
                                "dd/MM/yy"
                            )}
                        </td>
                        <td>{formatMinutesToString(log.time)}</td>
                        <td>{log.description}</td>
                        {options.showProject && (
                            <td>
                                <Link
                                    to={route(BuildingRoutes.Detail, {
                                        //id: log.building.id,
                                    })}>
                                    {/* {log.project.name} */}
                                </Link>
                            </td>
                        )}
                        {options.showUser && <td>{formatName(log.user)}</td>}
                        <td className="d-flex">
                            <Button
                                size="sm"
                                onClick={() => handleEditClick(log)}
                                color="secondary">
                                <BiPencil />
                            </Button>
                            <DeleteButton
                                size="sm"
                                id={log.id}
                                scope="logs"
                                onSuccess={handleDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
            {currentLog && (
                <CreateEditLogDialog
                    onDismiss={() => setCurrentLog(null)}
                    onSuccess={() => handleUpdate()}
                    log={currentLog}
                    options={options}
                />
            )}
        </>
    );
};

export default LogsTable;
