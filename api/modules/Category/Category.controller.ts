import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import CategoryService from "./Category.service";
import { CategoryBody } from "./Category.types";


export default class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    all = async (req: Request, res: Response, next: NextFunction) => {
        const categories = await this.categoryService.all();
        return res.json(categories);
    };

    find = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const category = await this.categoryService.findOne(
            parseInt(req.params.id)
        );
        if (!category) {
            next(new NotFoundError());
            return;
        }
        return res.json(category);
    };

    create = async (
        req: Request<{}, {}, CategoryBody>,
        res: Response,
        next: NextFunction
    ) => {
        const category = await this.categoryService.create(req.body);
        return res.json(category);
    };

    update = async (
        req: Request<{ id: string }, {}, CategoryBody>,
        res: Response,
        next: NextFunction
    ) => {
        const category = await this.categoryService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!category) {
            next(new NotFoundError());
            return;
        }
        return res.json(category);
    };

    delete = async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const category = await this.categoryService.delete(parseInt(req.params.id));
        if (!category) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
}
