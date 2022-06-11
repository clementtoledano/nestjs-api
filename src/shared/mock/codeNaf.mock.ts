import { CodeNafEntity } from "../../core/code-naf/entities/code-naf.entity";
import faker from 'faker';

const codeNafMock: CodeNafEntity = {
    id: faker.datatype.uuid(),
    // id: "321654987",
    code: faker.datatype.string(5),
    // code: "ABCD",
    name: faker.commerce.department()
    // name: "Mock Company Type"
};

export default codeNafMock;