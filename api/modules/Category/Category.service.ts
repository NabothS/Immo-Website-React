import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import Category from "./Category.entity";
import { CategoryBody } from "./Category.types";


export default class CategoryService {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    all = async () => {
        const categories = await this.repository.find({
            order: {
                name: "ASC",
            },
        });
        return categories;
    };

    findOne = async (id: number) => {
        const category = await this.repository.findOneBy({ id });
        return category;
    };

    create = async (body: CategoryBody) => {
        const category = await this.repository.save(this.repository.create(body));
        return category;
    };

    update = async (id: number, body: CategoryBody) => {
        let category = await this.findOne(id);
        if (category) {
            category = await this.repository.save({ ...category, ...body });
        }
        return category;
    };

    delete = async (id: number) => {
        // make sure the findOne has relation "projects" and "projects.logs" -> due to "cascade: true" projects and logs will be deleted as well
        let category = await this.repository.findOne({
            where: { id },
        });
        if (category) {
            await this.repository.softRemove(category);
        }
        return category;
    };
}
