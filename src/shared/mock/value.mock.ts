import faker from 'faker';
import { ValueEntity } from '../../core/value/entities/value.entity';
import productMock from './product.mock';
import filterMock from './filter.mock';

const valueMock: ValueEntity = {
    id: faker.datatype.uuid(),
    value: 'blonde',
    product: productMock,
    filter: filterMock,
};

export default valueMock;