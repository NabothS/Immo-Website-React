import Building from "../Building/Building.entity";
import User from "../User/User.entity";

export interface LogBody {
    name: string;
    description: string;
    time: number;
    date: string;
    buildingId: number;
    building?: Building;
    userId: number;
    user?: User;
}
