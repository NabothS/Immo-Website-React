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
export default class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Building, (building) => building.favorites,{
        cascade: true,
    })
    building: Building;

    @ManyToOne(() => User, (user) => user.favorites ,{
        cascade: true,
    })
    user: User;
}
