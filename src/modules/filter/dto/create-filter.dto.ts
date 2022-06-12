import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UnitI } from "../../../modules/unit/interfaces/unit.interface";

export class CreateFilterDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    unit?: UnitI;

}
