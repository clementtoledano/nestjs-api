import { FilterI } from "../../../modules/filter/interfaces/filter.interface";
import { ProductI } from "../../../modules/product/interfaces/product.interface";

export interface ValueI {

    id: string;
    value: string;
    createdOn?: Date;
    updatedOn?: Date;
    product: ProductI;
    filter: FilterI;

}