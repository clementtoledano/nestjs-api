import { ApiProperty } from "@nestjs/swagger";
import { CompanyI } from "../../../modules/company/interfaces/company.interface";

export class CreateProductionDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    company: CompanyI;

}
