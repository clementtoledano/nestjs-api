import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CountryCodeEnum } from "../../../constants/country-code.enum";
import { UnitCategoryEnum } from "../../../constants/unit-category.enum";

export class CreateUnitDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    symbol: string;

    @ApiProperty({ enum: UnitCategoryEnum })
    unitCategory?: UnitCategoryEnum;

    @ApiProperty({ enum: CountryCodeEnum })
    countryCode?: CountryCodeEnum;
}
