import { ApiProperty } from "@nestjs/swagger";
import { FilterI } from "../../../modules/filter/interfaces/filter.interface";
import { ProductI } from "../../../modules/product/interfaces/product.interface";

export class CreateValueDto {
    @ApiProperty()
    value: string;

    @ApiProperty()
    product: ProductI;

    @ApiProperty()
    filter: FilterI;

}
