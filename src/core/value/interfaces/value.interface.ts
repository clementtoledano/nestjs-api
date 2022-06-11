import { FilterI } from "../../../core/filter/interfaces/filter.interface";
import { ProductI } from "../../../core/product/interfaces/product.interface";

export interface ValueI {

    id: string;
    value: string;
    createdOn?: Date;
    updatedOn?: Date;
    product: ProductI;
    filter: FilterI;

}