// import { faker } from "@faker-js/faker";
import { CompanyTypeEntity } from "../../core/company-type/entities/company-type.entity";


const companyTypeMock: CompanyTypeEntity = {
    // id: faker.datatype.uuid(),
    id: "321654987",
    // code: faker.datatype.string(5),
    code: "ABCD",
    // name: faker.commerce.department()
    name: "Mock Company Type"
};

export default companyTypeMock;