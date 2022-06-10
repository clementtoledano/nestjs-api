
import * as faker from "faker";
import { UnitI } from "../../core/unit/interfaces/company.interface";
import { UnitCategoryEnum } from "../enum/unit-category.enum";
import { CountryCodeEnum } from "../enum/country-code.enum";


const userMock: UnitI = {
    id: faker.datatype.uuid(),
    name: 'centilitre',
    symbol: 'cl',

    unitCategory: UnitCategoryEnum.VOLUME,
    countryCode: CountryCodeEnum.FR,


};

export default userMock;