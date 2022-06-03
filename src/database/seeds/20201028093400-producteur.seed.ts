import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { plainToClass } from 'class-transformer';

import { User } from '../../core/users/entities/user.entity';
import { RoleEnum } from '../../core/roles/roles.enum';
import { StatusEnum } from '../../core/statuses/statuses.enum';

export default class CreateProducteur implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const countUser = await connection
            .createQueryBuilder()
            .select()
            .from(User, 'User')
            .where('"User"."roleId" = :roleId', { roleId: RoleEnum.producteur })
            .getCount();

        if (countUser === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    plainToClass(User, {
                        firstname: 'John',
                        lastname: 'Malpest',
                        email: 'john.malpest@example.com',
                        password: 'secret',
                        companyName: 'Sarl Malpest',
                        sirenNumber: '847770948',
                        phone: '075599555',
                        role: {
                            id: RoleEnum.producteur,
                            name: 'Producteur',
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