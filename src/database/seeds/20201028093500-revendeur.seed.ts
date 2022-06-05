import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { UserEntity } from '../../core/user/entities/user.entity';
import { RoleEnum } from '../../core/role/role.enum';
import { StatusEnum } from '../../core/status/status.enum';

export default class CreateRevendeur implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const countUser = await connection
            .createQueryBuilder()
            .select()
            .from(UserEntity, 'User')
            .where('"User"."roleId" = :roleId', { roleId: RoleEnum.revendeur })
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
                        sirenNumber: '847771948',
                        phone: '0630201000',
                        role: {
                            id: RoleEnum.revendeur,
                            name: 'Revendeur',
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