import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";

const NavBar = ({ navItems = [], onLogout }) => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    RealEstating
                </Link>
                <div className="" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((navItem) => (
                            <li className="nav-item" key={navItem.href}>
                                <Link
                                    className={`nav-link ${
                                        navItem.isActive ? "active" : ""
                                    }`}
                                    to={navItem.href}>
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Button color="secondary" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default NavBar;
