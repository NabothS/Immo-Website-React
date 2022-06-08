import PropTypes from "prop-types";

const Alert = ({ children, color = "primary" }) => {
    return (
        <div className={`alert alert-${color} mt-2`} role="alert">
            {children}
        </div>
    );
};

Alert.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "danger"]),
};

export default Alert;
