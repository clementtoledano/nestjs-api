import { CompanyTypeEntity } from "../../core/company-type/entities/company-type.entity";
import { faker } from '@faker-js/faker';


const companyTypeMock: CompanyTypeEntity = {
    id: faker.datatype.uuid(),
    code: faker.datatype.string(5),
    name: faker.commerce.department()
};

export default companyTypeMock;