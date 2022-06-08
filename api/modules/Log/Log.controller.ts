import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import BuildingService from "../Building/Building.service";
import UserService from "../User/User.service";
import LogService from "./Log.service";
import { LogBody } from "./Log.types";

export default class LogController {
    private logService: LogService;
    private buildingService: BuildingService;
    private userService: UserService;

    constructor() {
        this.logService = new LogService();
        this.buildingService = new BuildingService();
        this.userService = new UserService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const logs = req.user.isAdmin()
            ? await this.logService.all()
            : await this.logService.allForUser(req.user.id);
        return res.json(logs);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const log = req.user.isAdmin()
            ? await this.logService.findOne(parseInt(req.params.id))
            : await this.logService.findOneForUser(
                  parseInt(req.params.id),
                  req.user.id
              );
        if (!log) {
            next(new NotFoundError());
            return;
        }
        return res.json(log);
    };

    create = async (
        req: AuthRequest<{}, {}, LogBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (!req.user.isAdmin()) {
            body.userId = req.user.id;
        }
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.buildingId) {
            body.building = await this.buildingService.findOne(body.buildingId);
        }
        // create project
        const log = await this.logService.create(body);
        return res.json(log);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, LogBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (!req.user.isAdmin()) {
            body.userId = req.user.id;
        }
        // check relations
        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }
        if (body.buildingId) {
            body.building = await this.buildingService.findOne(body.buildingId);
        }
        // update project
        const log = req.user.isAdmin()
            ? await this.logService.update(parseInt(req.params.id), body)
            : await this.logService.updateForUser(
                  parseInt(req.params.id),
                  body,
                  req.user.id
              );
        if (!log) {
            next(new NotFoundError());
            return;
        }
        return res.json(log);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const log = req.user.isAdmin()
            ? await this.logService.delete(parseInt(req.params.id))
            : await this.logService.deleteForUser(
                  parseInt(req.params.id),
                  req.user.id
              );
        if (!log) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
