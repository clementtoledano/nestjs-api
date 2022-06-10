import faker from 'faker';
import { CategoryEntity } from '../../core/category/entities/category.entity';
import familyMock from './family.mock';


const categoryMock: CategoryEntity = {
    id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    family: familyMock
};

export default categoryMock;