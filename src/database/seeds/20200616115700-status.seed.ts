import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { StatusEntity } from '../../core/status/entities/status.entity';
import { StatusEnum } from '../../core/status/status.enum';

export default class CreateStatus implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(StatusEntity, 'Status').getCount();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(StatusEntity)
                .values([
                    { id: StatusEnum.active, name: 'Active' },
                    { id: StatusEnum.inactive, name: 'Inactive' },
                    { id: StatusEnum.suspend, name: 'Suspend' },
                ])
                .execute();
        }
    }
}