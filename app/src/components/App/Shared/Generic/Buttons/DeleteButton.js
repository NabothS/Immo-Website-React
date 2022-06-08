import Button from "../../../../Design/Buttons/Button";
import { BiTrash } from "react-icons/bi";
import useMutation from "../../../../../core/hooks/useMutation";
import PropTypes from "prop-types";
import { useEffect } from "react";

const DeleteButton = ({ onSuccess, id, scope, disabled, ...rest }) => {
    const { isLoading, error, mutate } = useMutation();

    const handleClick = () => {
        mutate(`${process.env.REACT_APP_API_URL}/${scope}/${id}`, {
            method: "DELETE",
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    useEffect(() => {
        if (error) {
            window.alert(error);
        }
    }, [error]);

    return (
        <Button
            color="danger"
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...rest}>
            <BiTrash />
        </Button>
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    ...Button.propTypes,
};

export default DeleteButton;
