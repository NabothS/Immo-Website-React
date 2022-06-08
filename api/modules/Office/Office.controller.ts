import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import OfficeService from "./Office.service";
import { OfficeBody } from "./Office.types";

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

export default class OfficeController {
    private officeService: OfficeService;

    constructor() {
        this.officeService = new OfficeService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const offices = await this.officeService.all();
        return res.json(offices);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.officeService.findOne(
            parseInt(req.params.id)
        );
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json(office);
    };

    create = async (
        req: Request<{}, {}, OfficeBody>,
        res: Response,
        next: NextFunction
    ) => {
        const avatar = getAvatar(req);
        if (avatar) {
            req.body.avatar = avatar;
        }
        const office = await this.officeService.create(req.body);
        return res.json(office);
    };

    update = async (
        req: Request<{ id: string }, {}, OfficeBody>,
        res: Response,
        next: NextFunction
    ) => {
        const avatar = getAvatar(req);
        if (avatar) {
            req.body.avatar = avatar;
        }
        const office = await this.officeService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json(office);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const office = await this.officeService.delete(parseInt(req.params.id));
        if (!office) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
