import faker from 'faker';
import { ProductionEntity } from '../../modules/production/entities/production.entity';
import companyMock from './company.mock';

const productionMock: ProductionEntity = {
    id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    company: companyMock
};

export default productionMock;