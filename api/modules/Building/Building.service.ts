import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import Building from "./Building.entity";
import { BuildingBody } from "./Building.types";

export default class BuildingService {
    private repository: Repository<Building>;

    constructor() {
        this.repository = AppDataSource.getRepository(Building);
    }

    all = async () => {
        const buildings = await this.repository.find({
            relations: ["office", "logs", "category" , "logs.building", "logs.user"],
        });
        return buildings;
    };

    findOne = async (id: number) => {
        const building = await this.repository.findOne({
            where: { id },
            relations: ["office", "logs","category", "logs.user", "logs.building"],
        });
        return building;
    };

    create = async (body: BuildingBody) => {
        console.log(body);
        const building = await this.repository.save(
            this.repository.create(body)
        );

        return building;
    };

    update = async (id: number, body: BuildingBody) => {
        let building = await this.findOne(id);
        if (building) {
            building = await this.repository.save({
                ...building,
                ...body,
            });
        }
        return building;
    };

    delete = async (id: number) => {
        let building = await this.findOne(id);
        if (building) {
            await this.repository.softRemove(building);
        }
        return building;
    };
}
