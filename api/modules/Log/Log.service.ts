import { AppDataSource } from "../../database/DataSource";
import { Repository } from "typeorm";
import Log from "./Log.entity";
import { LogBody } from "./Log.types";

export default class LogService {
    private logRepository: Repository<Log>;

    constructor() {
        this.logRepository = AppDataSource.getRepository(Log);
    }

    all = async () => {
        const logs = await this.logRepository.find({
            relations: ["user", "building"],
            order: { date: "ASC" },
        });
        return logs;
    };

    allForUser = async (userId: number) => {
        const logs = await this.logRepository.find({
            relations: ["user", "building"],
            where: { user: { id: userId } },
            order: { date: "ASC" },
        });
        return logs;
    };

    findOne = async (id: number) => {
        const log = await this.logRepository.findOne({
            where: { id },
            relations: ["user", "building"],
        });
        return log;
    };

    findOneForUser = async (id: number, userId: number) => {
        const log = await this.logRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ["user", "building"],
        });
        return log;
    };

    create = async (body: LogBody) => {
        const log = await this.logRepository.save(
            this.logRepository.create(body)
        );
        return log;
    };

    update = async (id: number, body: LogBody) => {
        let log = await this.findOne(id);
        if (log) {
            log = await this.logRepository.save({
                ...log,
                ...body,
            });
        }
        return log;
    };

    updateForUser = async (id: number, body: LogBody, userId: number) => {
        let log = await this.findOneForUser(id, userId);
        if (log) {
            log = await this.logRepository.save({
                ...log,
                ...body,
            });
        }
        return log;
    };

    delete = async (id: number) => {
        let log = await this.findOne(id);
        if (log) {
            await this.logRepository.softRemove(log);
        }
        return log;
    };

    deleteForUser = async (id: number, userId: number) => {
        let log = await this.findOneForUser(id, userId);
        if (log) {
            await this.logRepository.softRemove(log);
        }
        return log;
    };
}
