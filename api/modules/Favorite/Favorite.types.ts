import Building from "../Building/Building.entity";
import User from "../User/User.entity";

export interface FavoriteBody {
    userId:number;
    user?:User;
    buildingId:number;
    building?:Building;

}
