import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const BackButton = ({ href = "/" }) => {
    return (
        <Link
            to={href}
            className="text-muted mt-4 mb-3 d-flex align-items-center">
            <BiArrowBack />
            <span className="d-block ms-1">Back</span>
        </Link>
    );
};

export default BackButton;
