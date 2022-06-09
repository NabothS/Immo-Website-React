import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { IsDefined } from "class-validator";
import Log from "../Log/Log.entity";
import LogService from "../Log/Log.service";
import Office from "../Office/Office.entity";
import Category from "../Category/Category.entity";
import Favorite from "../Favorite/Favorite.entity";

@Entity()
export default class Building extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined()
    @Column()
    size: string;

    @Column()
    buy_rent: string;

    @Column()
    year: string;

    @Column()
    street: string;

    @Column({ nullable: true })
    number: string;

    @Column()
    city: string;

    @Column()
    price: string;

    @Column({ nullable: true })
    avatar: string;

    @Column( {default: 0, })
    isSold: boolean;

    @ManyToOne(() => Office, (office) => office.buildings)
    office: Office;

    @OneToMany(() => Favorite, (favorite) => favorite.building, {
    })
    favorites: Favorite[];

    @OneToMany(() => Log, (log) => log.building, {
        cascade: true,
    })
    logs: Log[];

    @ManyToOne(() => Category, (category) => category.buildings)
    category: Category;

}
