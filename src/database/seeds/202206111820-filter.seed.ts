import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { FilterEntity } from '../../core/filter/entities/filter.entity';

export default class CreateFilter implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(FilterEntity, 'Filter').getCount();




        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(FilterEntity)
                .values([
                    plainToClass(FilterEntity, {
                        name: 'Couleur'
                    }),
                ])
                .execute();
        }
    }
}
