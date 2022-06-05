import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Role } from '../../core/role/entities/role.entity';
import { RoleEnum } from '../../core/role/role.enum';

export default class CreateRole implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(Role, 'Role').getCount();


        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(Role)
                .values([
                    { id: RoleEnum.admin, name: 'Admin' },
                    { id: RoleEnum.visiteur, name: 'Guest' },
                    { id: RoleEnum.producteur, name: 'Producteur' },
                    { id: RoleEnum.distributeur, name: 'Distributeur' },
                    { id: RoleEnum.revendeur, name: 'Revendeur' },
                ])
                .execute();
        }
    }
}
