import "reflect-metadata";
import { DataSource } from "typeorm";
import Building from "../modules/Building/Building.entity";
import Category from "../modules/Category/Category.entity";
import Favorite from "../modules/Favorite/Favorite.entity";
import Log from "../modules/Log/Log.entity";
import Office from "../modules/Office/Office.entity";
import User from "../modules/User/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Office, User, Building, Log, Category, Favorite],
    migrations: [],
    subscribers: [],
    ...(process.env.ENV === "production"
        ? {
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {}),
});
