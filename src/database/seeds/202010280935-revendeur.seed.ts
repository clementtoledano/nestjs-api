import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { UserEntity } from '../../modules/user/entities/user.entity';
import { RoleEnum } from '../../shared/enum/role.enum';
import { StatusEnum } from '../../shared/enum/status.enum';

export default class CreateRevendeur implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const countUser = await connection
            .createQueryBuilder()
            .select()
            .from(UserEntity, 'User')
            .where('"User"."role" = :role', { role: RoleEnum.REVENDEUR })
            .getCount();

        if (countUser === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(UserEntity)
                .values([
                    plainToClass(UserEntity, {
                        firstname: 'Andrew',
                        lastname: 'Toledano',
                        email: 'andrew.toledano@antol.com',
                        password: 'rahrahrah',
                        companyName: 'Antol Cafe',
                        sirenNumber: '847771947',
                        phone: '0630201000',
                        role: RoleEnum.REVENDEUR,
                        status: StatusEnum.ACTIVE,
                    }),
                ])
                .execute();
        }
    }
}