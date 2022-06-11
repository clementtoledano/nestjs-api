import { ApiProperty } from "@nestjs/swagger";
import { FilterI } from "../../../core/filter/interfaces/filter.interface";
import { ProductI } from "../../../core/product/interfaces/product.interface";

export class CreateValueDto {
    @ApiProperty()
    value: string;

    @ApiProperty()
    product: ProductI;

    @ApiProperty()
    filter: FilterI;

}
