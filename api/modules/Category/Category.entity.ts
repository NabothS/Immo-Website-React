import {
    BeforeSoftRemove,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import Building from "../Building/Building.entity";
import User from "../User/User.entity";

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
