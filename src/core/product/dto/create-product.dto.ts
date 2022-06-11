import { ApiProperty } from "@nestjs/swagger";
import { CategoryI } from "src/core/category/interfaces/category.interface";
import { ProductionI } from "src/core/production/interfaces/production.interface";
import { FamilyI } from "../../family/interfaces/family.interface";

export class CreateProductDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    tag: string;

    @ApiProperty()
    production: ProductionI;

    @ApiProperty()
    family: FamilyI;

    @ApiProperty()
    category: CategoryI;

}
