import PropTypes from "prop-types";

const Label = ({ htmlFor, children }) => {
    return (
        <label className="form-label" htmlFor={htmlFor}>
            {children}
        </label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string,
};

export default Label;
