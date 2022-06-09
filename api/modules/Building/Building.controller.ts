import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import CategoryService from "../Category/Category.service";
import OfficeService from "../Office/Office.service";
import { OfficeBody } from "../Office/Office.types";
import { UserRole } from "../User/User.constants";
import UserService from "../User/User.service";
import Building from "./Building.entity";
import BuildingService from "./Building.service";
import { BuildingBody } from "./Building.types";

// if avatar passed, move to uploads folder and save path
const getAvatar = (req: Request) => {
    if (req.files.avatar) {
        const avatar: UploadedFile = Array.isArray(req.files.avatar)
            ? req.files.avatar[0]
            : req.files.avatar;
        const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${avatar.name}`;
        avatar.mv(path);
        return path;
    }
    return null;
};

export default class BuildingController {
    private buildingService: BuildingService;
    private officeService: OfficeService;
    private categoryService: CategoryService;
    private userService: UserService;


    constructor() {
        this.buildingService = new BuildingService();
        this.officeService = new OfficeService();
        this.categoryService = new CategoryService();
        this.userService = new UserService();

    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const user = await this.userService.findOne(req.user.id);
        let buildings:Object;
        if(user.isAdmin()){
            buildings = await this.buildingService.all();
        }
        else if(user.office === null){
            buildings = await this.buildingService.all();
        }
        else{
            buildings = await this.buildingService.findByOfficeId( user.office.id );
        }

        return res.json(buildings); 
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const building = await this.buildingService.findOne(
            parseInt(req.params.id)
        );
        if (!building) {
            next(new NotFoundError());
            return;
        }
        return res.json(building);
    };

    create = async (
        req: Request<{}, {}, BuildingBody>,
        res: Response,
        next: NextFunction
    ) => {
        const avatar = getAvatar(req);
        if (avatar) {
            req.body.avatar = avatar;
        }

        const { body } = req;
        // check if clientId is passed, if so find client
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }

         if (body.categoryId) {
            body.category = await this.categoryService.findOne(body.categoryId);
        } 

        // create project
        
        const building = await this.buildingService.create(body);
        return res.json(building); 
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, BuildingBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if clientId is passed, if so find client
        if (body.officeId) {
            body.office = await this.officeService.findOne(body.officeId);
        }
        // update project
        const building = await this.buildingService.update(
            parseInt(req.params.id),
            body
        );
        if (!building) {
            next(new NotFoundError());
            return;
        }
        return res.json(building);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const building = await this.buildingService.delete(
            parseInt(req.params.id)
        );
        if (!building) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
