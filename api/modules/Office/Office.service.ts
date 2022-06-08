import { Repository } from "typeorm";

import { AppDataSource } from "../../database/DataSource";
import Office from "./Office.entity";
import { OfficeBody } from "./Office.types";


export default class OfficeService {
    private repository: Repository<Office>;

    constructor() {
        this.repository = AppDataSource.getRepository(Office);
    }

    all = async () => {
        const offices = await this.repository.find({
            order: {
                name: "ASC",
            },
        });
        return offices;
    };

    findOne = async (id: number) => {
        const office = await this.repository.findOneBy({ id });
        return office;
    };

    create = async (body: OfficeBody) => {
        const office = await this.repository.save(this.repository.create(body));
        return office;
    };

    update = async (id: number, body: OfficeBody) => {
        let office = await this.findOne(id);
        if (office) {
            office = await this.repository.save({ ...office, ...body });
        }
        return office;
    };

    delete = async (id: number) => {
        // make sure the findOne has relation "projects" and "projects.logs" -> due to "cascade: true" projects and logs will be deleted as well
        let office = await this.repository.findOne({
            where: { id },
        });
        if (office) {
            await this.repository.softRemove(office);
        }
        return office;
    };
}
