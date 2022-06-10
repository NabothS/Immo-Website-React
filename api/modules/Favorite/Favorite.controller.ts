import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import BuildingService from "../Building/Building.service";
import UserService from "../User/User.service";
import FavoriteService from "./Favorite.service";
import { FavoriteBody } from "./Favorite.types";

export default class FavoriteController {
    private favoriteService: FavoriteService;
    private userService: UserService;
    private buildingService: BuildingService;

    constructor() {
        this.favoriteService = new FavoriteService();
        this.userService = new UserService();
        this.buildingService = new BuildingService();

    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const favorites = await this.favoriteService.all();
        return res.json(favorites);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const favorite = await this.favoriteService.findOne(
            parseInt(req.params.id)
        );
        if (!favorite) {
            next(new NotFoundError());
            return;
        }
        return res.json(favorite);
    };

    create = async (
        req: Request<{}, {}, FavoriteBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        if (body.userId) {
            body.user = await this.userService.findOne(body.userId);
        }

         if (body.buildingId) {
            body.building = await this.buildingService.findOne(body.buildingId);
        } 

        /* const favorites = await this.favoriteService.all();

        favorites.forEach(item => {
            if (item.user.id == body.userId && item.building.id == body.buildingId){
                return res.json('');
            }
        }) */

        const favorite = await this.favoriteService.create(req.body);
        return res.json(favorite);
    };

    update = async (
        req: Request<{ id: string }, {}, FavoriteBody>,
        res: Response,
        next: NextFunction
    ) => {
        const favorite = await this.favoriteService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!favorite) {
            next(new NotFoundError());
            return;
        }
        return res.json(favorite);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const favorite = await this.favoriteService.delete(parseInt(req.params.id));
        if (!favorite) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
