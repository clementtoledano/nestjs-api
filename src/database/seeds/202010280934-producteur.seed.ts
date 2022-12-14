import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { UserEntity } from '../../modules/user/entities/user.entity';
import { RoleEnum } from '../../constants/role.enum';
import { StatusEnum } from '../../constants/status.enum';

export default class CreateProducteur implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const countUser = await connection
            .createQueryBuilder()
            .select()
            .from(UserEntity, 'User')
            .where('"User"."role" = :role', { role: RoleEnum.PRODUCTEUR })
            .getCount();

        if (countUser === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(UserEntity)
                .values([
                    plainToClass(UserEntity, {
                        firstname: 'John',
                        lastname: 'Malpest',
                        email: 'john.malpest@example.com',
                        password: 'secret',
                        companyName: 'Sarl Malpest',
                        sirenNumber: '847770948',
                        phone: '075599555',
                        role: RoleEnum.PRODUCTEUR,
                        status: StatusEnum.ACTIVE,
                    }),
                ])
                .execute();
        }
    }
}
