
import * as faker from "faker";
import { UnitI } from "../../modules/unit/interfaces/unit.interface";
import { UnitCategoryEnum } from "../../constants/unit-category.enum";
import { CountryCodeEnum } from "../../constants/country-code.enum";

const unitMock: UnitI = {
    id: faker.datatype.uuid(),
    name: 'centilitre',
    symbol: 'cl',

    unitCategory: UnitCategoryEnum.VOLUME,
    countryCode: CountryCodeEnum.FR,
};

export default unitMock;