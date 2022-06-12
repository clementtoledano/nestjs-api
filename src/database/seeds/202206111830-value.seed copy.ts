import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ValueEntity } from '../../modules/value/entities/value.entity';

import { ProductEntity } from '../../modules/product/entities/product.entity';
import { FilterEntity } from '../../modules/filter/entities/filter.entity';

export default class CreateValue implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(ValueEntity, 'Value').getCount();

        const product = await connection
            .createQueryBuilder()
            .select('product')
            .from(ProductEntity, 'product')
            .where('product.name = :name', { name: 'Délirium Tremens' })
            .getOne();

        const filter = await connection
            .createQueryBuilder()
            .select('filter')
            .from(FilterEntity, 'filter')
            .where('filter.name = :name', { name: 'Couleur' })
            .getOne();


        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(ValueEntity)
                .values([
                    plainToClass(ValueEntity, {
                        value: 'Rouge',
                        product: product.id,
                        filter: filter.id,
                    }),
                ])
                .execute();
        }
    }
}
