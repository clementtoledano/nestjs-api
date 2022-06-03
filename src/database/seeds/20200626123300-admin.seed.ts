import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { User } from '../../core/users/entities/user.entity';
import { RoleEnum } from '../../core/roles/roles.enum';
import { StatusEnum } from '../../core/statuses/statuses.enum';

export default class CreateAdmin implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const countAdmin = await connection
            .createQueryBuilder()
            .select()
            .from(User, 'User')
            .where('"User"."roleId" = :roleId', { roleId: RoleEnum.admin })
            .getCount();

        if (countAdmin === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    plainToClass(User, {
                        firstname: 'Super',
                        lastname: 'Admin',
                        email: 'admin@example.com',
                        password: 'secret',
                        companyName: 'Nash',
                        sirenNumber: '321564321',
                        phone: '0651523225',
                        role: {
                            id: RoleEnum.admin,
                            name: 'Admin',
                        },
                        status: {
                            id: StatusEnum.active,
                            name: 'Active',
                        },
                    }),
                ])
                .execute();
        }
    }
}