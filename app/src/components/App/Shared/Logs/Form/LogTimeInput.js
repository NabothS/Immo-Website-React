import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    formatMinutesToString,
    parseStringToMinutes,
} from "../../../../../core/modules/logs/utils";
import Input from "../../../../Design/Form/Input";

const LogTimeInput = ({ value, name, onChange, ...rest }) => {
    const [time, setTime] = useState(value ? formatMinutesToString(value) : "");

    const handleBlur = (e) => {
        onChange({
            target: {
                value: parseStringToMinutes(e.target.value),
                name,
            },
        });
    };

    useEffect(() => {
        setTime(formatMinutesToString(value));
    }, [value]);

    return (
        <Input
            onBlur={handleBlur}
            value={time}
            name={name}
            onChange={(e) => setTime(e.target.value)}
            {...rest}
        />
    );
};

LogTimeInput.propTypes = {
    ...Input.propTypes,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LogTimeInput;
