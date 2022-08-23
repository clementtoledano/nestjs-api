import faker from 'faker';
import { ProductEntity } from '../../modules/product/entities/product.entity';
import categoryMock from './category.mock';
import familyMock from './family.mock';
import productionMock from './production.mock';

const productMock: ProductEntity = {
    id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    description: 'blabla blabla',
    tag: '',
    production: productionMock,
    family: familyMock,
    category: categoryMock,
};

export default productMock;