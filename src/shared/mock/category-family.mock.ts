import faker from 'faker';
import { CategoryFamilyEntity } from '../../core/category-family/entities/category-family.entity';


const categoryFamilyMock: CategoryFamilyEntity = {
    id: faker.datatype.uuid(),
    name: faker.commerce.department()
};

export default categoryFamilyMock;