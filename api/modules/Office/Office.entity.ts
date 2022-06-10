import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import Building from "../Building/Building.entity";
import User from "../User/User.entity";

@Entity()
export default class Office extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    name: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column()
    contactEmail: string;

    @IsDefined({ always: true })
    @Column()
    contactPhone: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Building, (building) => building.office, {
        cascade: true,
    })
    buildings: Building[];

    @OneToMany(() => User, (user) => user.office, {
        cascade: true,
    })
    users: User[];
}
