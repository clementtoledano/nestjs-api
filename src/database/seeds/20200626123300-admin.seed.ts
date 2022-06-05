import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { UserEntity } from '../../core/user/entities/user.entity';
import { RoleEnum } from '../../core/role/role.enum';
import { StatusEnum } from '../../core/status/status.enum';

export default class CreateAdmin implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const countAdmin = await connection
            .createQueryBuilder()
            .select()
            .from(UserEntity, 'User')
            .where('"User"."roleId" = :roleId', { roleId: RoleEnum.admin })
            .getCount();

        if (countAdmin === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(UserEntity)
                .values([
                    plainToClass(UserEntity, {
                        firstname: 'Super',
                        lastname: 'Admin',
                        email: 'ADMIN@example.com',
                        password: 'secret',
                        companyName: 'Nash',
                        sirenNumber: '321564321',
                        phone: '0651523225',
                        role: {
                            id: RoleEnum.admin,
                            name: 'Admin',
                        },
                        status: StatusEnum.active,


                    }),
                ])
                .execute();
        }
    }
}