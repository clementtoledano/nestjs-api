import { ApiProperty } from "@nestjs/swagger";
import { CategoryI } from "../../../modules/category/interfaces/category.interface";
import { ProductionI } from "../../../modules/production/interfaces/production.interface";
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
