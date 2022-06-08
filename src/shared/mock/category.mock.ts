import faker from 'faker';
import categoryFamilyMock from './category-family.mock';


const categoryMock: CategoryEntity = {
    id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    categoryFamily: categoryFamilyMock
};

export default categoryMock;