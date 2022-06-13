import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { UserEntity } from '../../modules/user/entities/user.entity';
import { RoleEnum } from '../../constants/role.enum';
import { StatusEnum } from '../../constants/status.enum';

export default class CreateAdmin implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {

        const countAdmin = await connection
            .createQueryBuilder()
            .select()
            .from(UserEntity, 'User')
            .where('"User"."role" = :role', { role: RoleEnum.ADMIN })
            .getCount();
        console.log("🚀 . CreateAdmin . run . countAdmin", countAdmin);

        if (!countAdmin) {
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
                        role: RoleEnum.ADMIN,
                        status: StatusEnum.ACTIVE,
                    }),
                ])
                .execute();
        }
    }
}