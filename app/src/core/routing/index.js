const AuthRoutes = {
  Index: "/auth",
  Login: "/auth/login",
  Register: "register",
};

const OfficeRoutes = {
  Index: "/offices",
  New: "/offices/new",
  Detail: "/offices/:id",
  Edit: "/offices/:id/edit",
};

const CategoryRoutes = {
  Index: "/categories",
  New: "/categories/new",
  Detail: "/categories/:id",
  Edit: "/categories/:id/edit",
};

const BuildingRoutes = {
  Index: "/buildings",
  New: "/buildings/new",
  Detail: "/buildings/:id",
  Edit: "/buildings/:id/edit",
};

const LogRoutes = {
  Index: "/logs",
  New: "/logs/new",
};

const UserRoutes = {
  Index: "/users",
  New: "/users/new",
  Detail: "/users/:id",
  Edit: "/users/:id/edit",
};

const RealtorRoutes = {
  Index: "/realtor",
  New: "/realtor/new",
  Detail: "/realtor/:id",
  Edit: "/realtor/:id/edit",
};

const FavoriteRoutes = {
    Index: "/favorites",
    New: "/favorites/new",
    Detail: "/favorites/:id",
    Edit: "/favorites/:id/edit",
  };

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export {
  AuthRoutes,
  OfficeRoutes,
  UserRoutes,
  LogRoutes,
  BuildingRoutes,
  CategoryRoutes,
  RealtorRoutes,
  FavoriteRoutes,
};
