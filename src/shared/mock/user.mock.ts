import { RoleEnum } from "../../constants/role.enum";
import { StatusEnum } from "../../constants/status.enum";
import * as bcrypt from 'bcrypt';
import { UserI } from "../../modules/user/interfaces/user.interface";
import * as faker from "faker";

const userMock: UserI = {
    id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: '$2a$15$sf5Aa/Xdr8cmsEQzsSxq7uAATnUG.HWyXZPc3lMtbWRDl05F7XdW2',
    companyName: '1001ref',
    sirenNumber: 9875987,
    phone: faker.phone.phoneNumber(),
    role: RoleEnum.PRODUCTEUR,
    status: StatusEnum.ACTIVE,
    newsletter: true,

    async hashPassword(): Promise<any> {
        this.password = await bcrypt.hash(this.password, 10);
    },
    emailToLowerCase: function (): void {
        throw new Error('Function not implemented.');
    }
};

export default userMock;