import { useRef } from "react";
import Input from "./Input";
import PropTypes from "prop-types";
import { getImagePath } from "../../../core/helpers/api";
import isVoid from "../../../core/helpers/isVoid";

const FileInput = ({
    label,
    name,
    accept = "image/*",
    onChange,
    value,
    error,
    disabled,
    ...rest
}) => {
    const ref = useRef();

    const handleChange = (e) => {
        onChange({
            target: {
                name,
                value: e.target.files[0],
            },
        });
    };

    return (
        <>
            {!isVoid(value) && (
                <img
                    className="d-block mb-3"
                    style={{ width: "3rem", height: "3rem" }}
                    src={
                        typeof value === "string"
                            ? getImagePath(value)
                            : URL.createObjectURL(value)
                    }
                    alt=""
                />
            )}
            <input
                className={`form-control ${error ? "is-invalid" : ""}`}
                type="file"
                accept="image/*"
                name={name}
                ref={ref}
                disabled={disabled}
                onChange={handleChange}
                {...rest}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

FileInput.propTypes = {
    ...Input.propTypes,
    value: PropTypes.any,
};

export default FileInput;
