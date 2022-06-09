import faker from 'faker';
import { FamilyEntity } from '../../core/family/entities/family.entity';


const familyMock: FamilyEntity = {
    id: faker.datatype.uuid(),
    name: faker.commerce.department()
};

export default familyMock;