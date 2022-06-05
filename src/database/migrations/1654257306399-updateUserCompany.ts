import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserCompany1654257306399 implements MigrationInterface {
    name = 'updateUserCompany1654257306399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "siretNumber" TO "sirenNumber"`);
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "siret" TO "siretNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "siretNumber" TO "siret"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "sirenNumber" TO "siretNumber"`);
    }

}
