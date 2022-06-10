import { CountryCodeEnum } from "../../../shared/enum/country-code.enum";
import { UnitCategoryEnum } from "../../../shared/enum/unit-category.enum";


export interface UnitI {
    id: string;
    name: string;
    symbol: string;
    unitCategory?: UnitCategoryEnum;
    countryCode?: CountryCodeEnum;
    createdOn?: Date;
    updatedOn?: Date;
}
