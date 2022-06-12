import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { CodeNafEntity } from '../../modules/code-naf/entities/code-naf.entity';

export default class CreateCodeNaf implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const count = await connection.createQueryBuilder().select().from(CodeNafEntity, 'CodeNaf').getCount();

        if (count === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(CodeNafEntity)
                .values([
                    plainToClass(CodeNafEntity, { code: '5630Z', name: 'Débits de boissons' }),
                    plainToClass(CodeNafEntity, { code: '1105Z', name: 'Fabrication de bière' }),
                    plainToClass(CodeNafEntity, { code: '5610A', name: 'Restauration traditionnelle' }),
                ])
                .execute();
        }
    }
}
