
import * as faker from "faker";
import { FilterI } from "../../modules/filter/interfaces/filter.interface";

const filterMock: FilterI = {
    id: faker.datatype.uuid(),
    name: 'centilitre',
};

export default filterMock;