import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
    AuthRoutes,
    OfficeRoutes,
    LogRoutes,
    UserRoutes,
    BuildingRoutes,
    CategoryRoutes,
} from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";

import AuthContainer from "./Auth/AuthContainer";

import RoleContainer from "./Auth/RoleContainer";
import { UserRoles } from "../../core/modules/users/constants";
import UsersLayout from "./Screens/Users/UsersLayout";
import UsersOverviewScreen from "./Screens/Users/Overview/UsersOverviewScreen";
import UserAddScreen from "./Screens/Users/Add/UserAddScreen";
import UserDetailLayout from "./Screens/Users/Detail/UserDetailLayout";
import UserDetailScreen from "./Screens/Users/Detail/UserDetailScreen";
import UserEditScreen from "./Screens/Users/Edit/UserEditScreen";
import LogsLayout from "./Screens/Logs/LogsLayout";
import LogsOverviewScreen from "./Screens/Logs/Overview/LogsOverviewScreen";
import LogAddScreen from "./Screens/Logs/Add/LogAddScreen";
import RegisterScreen from "./Auth/Register/RegisterScreen";
import OfficesLayout from "./Screens/Offices/OfficesLayout";
import OfficesOverviewScreen from "./Screens/Offices/Overview/OfficesOverviewScreen";
import OfficeAddScreen from "./Screens/Offices/Add/OfficeAddScreen";
import OfficeDetailLayout from "./Screens/Offices/Detail/OfficeDetailLayout";
import OfficeEditScreen from "./Screens/Offices/Edit/OfficeEditScreen";
import BuildingsLayout from "./Screens/Buildings/BuildingsLayout";
import BuildingsOverviewScreen from "./Screens/Buildings/Overview/BuildingsOverviewScreen";
import BuildingAddScreen from "./Screens/Buildings/Add/BuildingAddScreen";
import BuildingDetailLayout from "./Screens/Buildings/Detail/BuildingDetailLayout";
import BuildingDetailScreen from "./Screens/Buildings/Detail/BuildingDetailScreen";
import BuildingEditScreen from "./Screens/Buildings/Edit/BuildingEditScreen";
import CategoriesLayout from "./Screens/Categories/CategoriesLayout";
import CategoriesOverviewScreen from "./Screens/Categories/Overview/CategoriesOverviewScreen";
import CategoryAddScreen from "./Screens/Categories/Add/CategoryAddScreen";
import CategoryDetailLayout from "./Screens/Categories/Detail/CategoryDetailLayout";
import CategoryDetailScreen from "./Screens/Categories/Detail/CategoryDetailScreen";
import CategoryEditScreen from "./Screens/Categories/Edit/CategoryEditScreen";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/register" element={<RegisterScreen />} />
                <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
                    <Route path={AuthRoutes.Login} element={<LoginScreen />} />
                    <Route
                        path="*"
                        element={<Navigate to={AuthRoutes.Login} />}
                    />
                </Route>
                <Route
                    element={
                        <AuthContainer>
                            <AppLayout />
                        </AuthContainer>
                    }>
                    {/* Clients */}
                    <Route
                        path={OfficeRoutes.Index}
                        element={<OfficesLayout />}>
                        <Route index element={<OfficesOverviewScreen />} />
                        <Route
                            path={OfficeRoutes.New}
                            element={<OfficeAddScreen />}
                        />
                        <Route
                            path={OfficeRoutes.Detail}
                            element={<OfficeDetailLayout />}>
                            <Route index element={<OfficeEditScreen />} />
                            <Route
                                path={OfficeRoutes.Edit}
                                element={<OfficeEditScreen />}
                            />
                        </Route>
                    </Route>
                    {/* Projects */}
                    <Route
                        path={BuildingRoutes.Index}
                        element={<BuildingsLayout />}>
                        <Route index element={<BuildingsOverviewScreen />} />
                        <Route
                            path={BuildingRoutes.New}
                            element={<BuildingAddScreen />}
                        />
                        <Route
                            path={BuildingRoutes.Detail}
                            element={<BuildingDetailLayout />}>
                            <Route index element={<BuildingDetailScreen />} />
                            <Route
                                path={BuildingRoutes.Edit}
                                element={<BuildingEditScreen />}
                            />
                        </Route>
                    </Route>
                    {/* Logs */}
                    <Route path={LogRoutes.Index} element={<LogsLayout />}>
                        <Route index element={<LogsOverviewScreen />} />
                        <Route
                            path={LogRoutes.New}
                            element={<LogAddScreen />}
                        />
                    </Route>
                    {/* Admin */}
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Admin]}>
                                <Outlet />
                            </RoleContainer>
                        }>
                        {/* Users */}
                        <Route
                            path={UserRoutes.Index}
                            element={<UsersLayout />}>
                            <Route index element={<UsersOverviewScreen />} />
                            <Route
                                path={UserRoutes.New}
                                element={<UserAddScreen />}
                            />
                            <Route
                                path={UserRoutes.Detail}
                                element={<UserDetailLayout />}>
                                <Route index element={<UserDetailScreen />} />
                                <Route
                                    path={UserRoutes.Edit}
                                    element={<UserEditScreen />}
                                />
                            </Route>
                        </Route>

                        <Route
                            path={CategoryRoutes.Index}
                            element={<CategoriesLayout />}>
                            <Route index element={<CategoriesOverviewScreen />} />
                            <Route
                                path={CategoryRoutes.New}
                                element={<CategoryAddScreen />}
                            />
                            <Route
                                path={CategoryRoutes.Detail}
                                element={<CategoryDetailLayout />}>
                                <Route index element={<CategoryDetailScreen />} />
                                <Route
                                    path={CategoryRoutes.Edit}
                                    element={<CategoryEditScreen />}
                                />
                            </Route>
                        </Route>
                    </Route>
                    {/* Realtor */}
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Realtor]}>
                                <Outlet />
                            </RoleContainer>
                        }>
                        {/* Users */}
                        <Route
                            path={UserRoutes.Index}
                            element={<UsersLayout />}>
                            <Route index element={<UsersOverviewScreen />} />
                            <Route
                                path={UserRoutes.New}
                                element={<UserAddScreen />}
                            />
                            <Route
                                path={UserRoutes.Detail}
                                element={<UserDetailLayout />}>
                                <Route index element={<UserDetailScreen />} />
                                <Route
                                    path={UserRoutes.Edit}
                                    element={<UserEditScreen />}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to={BuildingRoutes.Index} />}
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
