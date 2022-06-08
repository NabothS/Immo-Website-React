import { useTranslation } from "react-i18next";
import useMutation from "../../../../../core/hooks/useMutation";
import Alert from "../../../../Design/Alert";
import Modal from "../../../../Design/Modal/Modal";
import LogForm from "./LogForm";

const CreateEditLogDialog = ({ log, onSuccess, onDismiss, options }) => {
    const { t } = useTranslation();

    const { isLoading, error, mutate } = useMutation();
    const isUpdate = !!log.id;

    const handleSubmit = (data) => {
        mutate(
            `${process.env.REACT_APP_API_URL}/${
                isUpdate ? `logs/${log.id}` : "logs"
            }`,
            {
                method: isUpdate ? "PATCH" : "POST",
                data,
                onSuccess: () => onSuccess(),
            }
        );
    };

    return (
        <Modal
            title={t(`logs.${isUpdate ? "edit" : "create"}.title`)}
            onDismiss={onDismiss}>
            {error && <Alert color="danger">{error}</Alert>}

            <LogForm
                label={t(`buttons.${isUpdate ? "save" : "create"}`)}
                onSubmit={handleSubmit}
                initialData={log}
                disabled={isLoading}
                options={options}
            />
        </Modal>
    );
};

export default CreateEditLogDialog;
