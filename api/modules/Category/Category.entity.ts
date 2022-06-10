import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { IsDefined } from "class-validator";
import Building from "../Building/Building.entity";

@Entity()
export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @OneToMany(() => Building, (building) => building.category, {
        cascade: true,
    })
    buildings: Building[];
}
