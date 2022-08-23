import { ApiProperty } from "@nestjs/swagger";
import { FamilyI } from "../../../modules/family/interfaces/family.interface";

export class CreateCategoryDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    family: FamilyI;

}
