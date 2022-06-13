import { CountryCodeEnum } from "../../../constants/country-code.enum";
import { UnitCategoryEnum } from "../../../constants/unit-category.enum";


export interface UnitI {
    id: string;
    name: string;
    symbol: string;
    unitCategory?: UnitCategoryEnum;
    countryCode?: CountryCodeEnum;
    createdOn?: Date;
    updatedOn?: Date;
}
