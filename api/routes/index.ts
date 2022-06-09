import { NextFunction, Request, Response, Router } from "express";
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import LogController from "../modules/Log/Log.controller";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import * as path from "path";
import OfficeController from "../modules/Office/Office.controller";
import BuildingController from "../modules/Building/Building.controller";
import CategoryController from "../modules/Category/Category.controller";

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };

const registerOnboardingRoutes = (router: Router) => {
    const authController = new AuthController();
    router.post("/login", authLocal, useMethod(authController.login));

    router.get("/", (req,res) => res.send("Wowzers"));
    // test route REMOVE after
    const userController = new UserController();
    if (process.env.ENV === "development") {
        
        router.post("/dev/users", useMethod(userController.create));
    }
};

const registerAdminRoutes = (router: Router) => {


};

const registerAuthenticatedRoutes = (router: Router) => {
    const authRouter = Router();

    const userController = new UserController();
    authRouter.get("/users", useMethod(userController.all));
    authRouter.get("/users/:id", useMethod(userController.find));
    authRouter.post("/users", useMethod(userController.create));
    authRouter.patch("/users/:id", useMethod(userController.update));
    authRouter.delete("/users/:id", useMethod(userController.delete));

    const officeController = new OfficeController();
    authRouter.get("/offices", useMethod(officeController.all));
    authRouter.get("/offices/:id", useMethod(officeController.find));
    authRouter.post("/offices", useMethod(officeController.create));
    authRouter.patch("/offices/:id", useMethod(officeController.update));
    authRouter.delete("/offices/:id", useMethod(officeController.delete));

    const categoryController = new CategoryController();
    authRouter.get("/categories", useMethod(categoryController.all));
    authRouter.get("/categories/:id", useMethod(categoryController.find));
    authRouter.post("/categories", useMethod(categoryController.create));
    authRouter.patch("/categories/:id", useMethod(categoryController.update));
    authRouter.delete("/categories/:id", useMethod(categoryController.delete)); 

    const buildingController = new BuildingController();
    authRouter.get("/buildings", useMethod(buildingController.all));
    authRouter.get("/buildings/:id", useMethod(buildingController.find));
    authRouter.post("/buildings", useMethod(buildingController.create));
    authRouter.patch("/buildings/:id", useMethod(buildingController.update));
    authRouter.delete("/buildings/:id", useMethod(buildingController.delete));

    const logController = new LogController();
    authRouter.get("/logs", useMethod(logController.all));
    authRouter.get("/logs/:id", useMethod(logController.find));
    authRouter.post("/logs", useMethod(logController.create));
    authRouter.patch("/logs/:id", useMethod(logController.update));
    authRouter.delete("/logs/:id", useMethod(logController.delete));

    registerAdminRoutes(authRouter);

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // public folder
    app.use("/public", express.static(path.resolve(__dirname, "../public")));


    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes };
