import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import Favorite from "./Favorite.entity";
import { FavoriteBody } from "./Favorite.types";


export default class FavoriteService {
    private repository: Repository<Favorite>;

    constructor() {
        this.repository = AppDataSource.getRepository(Favorite);
    }

    all = async () => {
        const favorites = await this.repository.find({
            relations: ["building", "user"],
        });
        return favorites;
    };

    findOne = async (id: number) => {
        const favorite = await this.repository.findOneBy({ id });
        return favorite;
    };

    create = async (body: FavoriteBody) => {
        const favorite = await this.repository.save(this.repository.create(body));
        return favorite;
    };

    update = async (id: number, body: FavoriteBody) => {
        let favorite = await this.findOne(id);
        if (favorite) {
            favorite = await this.repository.save({ ...favorite, ...body });
        }
        return favorite;
    };

    delete = async (id: number) => {
        // make sure the findOne has relation "projects" and "projects.logs" -> due to "cascade: true" projects and logs will be deleted as well
        let favorite = await this.repository.findOne({
            where: { id },
        });
        if (favorite) {
            await this.repository.softRemove(favorite);
        }
        return favorite;
    };
}
