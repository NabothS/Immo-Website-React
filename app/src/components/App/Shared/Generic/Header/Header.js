import {
    
    BuildingRoutes,
    CategoryRoutes,
    LogRoutes,
    OfficeRoutes,
    UserRoutes,
} from "../../../../../core/routing";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { isAdmin } from "../../../../../core/modules/users/utils";

const Header = () => {
    const { t } = useTranslation();
    const user = useUser();
    const location = useLocation();
    const { logout } = useAuthContext();

    // default routes
    let items = [
        {
            href: BuildingRoutes.Index,
            isActive: location.pathname.includes(BuildingRoutes.Index),
            label: t("Buildings"),
        },
        {
            href: LogRoutes.Index,
            isActive: location.pathname.includes(LogRoutes.Index),
            label: t("Messages"),
        },
    ];

    if(user){
        console.log(user);
        if(user.role == "REALTOR"){
            items = [
                {
                    href: BuildingRoutes.Index,
                    isActive: location.pathname.includes(BuildingRoutes.Index),
                    label: t("Buildings"),
                },
                {
                    href: LogRoutes.Index,
                    isActive: location.pathname.includes(LogRoutes.Index),
                    label: t("Messages"),
                },
                {
                    href: OfficeRoutes.Index,
                    isActive: location.pathname.includes(OfficeRoutes.Index),
                    label: t("My Real Estate Office"),
                },
                {
                    href: UserRoutes.Index,
                    isActive: location.pathname.includes(UserRoutes.Index),
                    label: t("Users"),
                },
            ];
        }
    

        // admin only routes
        if (isAdmin(user)) {
            items = [
                ...items,
                {
                    href: OfficeRoutes.Index,
                    isActive: location.pathname.includes(OfficeRoutes.Index),
                    label: t("Real Estate Offices"),
                },
                {
                    href: CategoryRoutes.Index,
                    isActive: location.pathname.includes(CategoryRoutes.Index),
                    label: t("Categories"),
                },
                {
                    href: UserRoutes.Index,
                    isActive: location.pathname.includes(UserRoutes.Index),
                    label: t("Users"),
                },
            ];
        }
    }

    return <NavBar onLogout={logout} navItems={items} />;
};

export default Header;
