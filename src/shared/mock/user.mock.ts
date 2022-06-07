import { RoleEnum } from "../../core/role/role.enum";
import { StatusEnum } from "../../core/status/status.enum";
import { UserEntity } from "../../core/user/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';


const userMock: UserEntity = {
    id: faker.datatype.uuid(),
    firstname: 'clem',
    lastname: 'tol',
    email: 'clem.tol@example.com',
    password: '$2a$15$sf5Aa/Xdr8cmsEQzsSxq7uAATnUG.HWyXZPc3lMtbWRDl05F7XdW2',
    companyName: '1001ref',
    sirenNumber: 9875987,
    phone: 75555555,
    role: {
        id: RoleEnum.producteur,
        name: 'Admin',
    },
    status: {
        id: StatusEnum.active,
        name: 'Active',
    },
    newsletter: true,
    async hashPassword(): Promise<any> {
        this.password = await bcrypt.hash(this.password, 10);
    },
    emailToLowerCase: function (): void {
        throw new Error('Function not implemented.');
    }
};

export default userMock;