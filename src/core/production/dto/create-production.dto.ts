import { ApiProperty } from "@nestjs/swagger";
import { CompanyI } from "../../../core/company/interfaces/company.interface";

export class CreateProductionDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    company: CompanyI;

}
