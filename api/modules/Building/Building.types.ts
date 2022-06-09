import Category from "../Category/Category.entity";
import Office from "../Office/Office.entity";

export interface BuildingBody {
    size: string;
    type: string;
    buy_rent: string;
    year: string;
    street: string;
    number: string;
    city: string;
    price: string;
    avatar?: string | null;
    officeId: number;
    office?: Office;
    categoryId : number;
    category?: Category;
}
