import faker from 'faker';
import { CodeNafEntity } from "../../modules/code-naf/entities/code-naf.entity";

const codeNafMock: CodeNafEntity = {
    id: faker.datatype.uuid(),
    code: faker.datatype.string(5),
    name: faker.commerce.department()
};

export default codeNafMock;