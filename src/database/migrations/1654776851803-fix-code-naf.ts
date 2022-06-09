import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCodeNaf1654776851803 implements MigrationInterface {
    name = 'fixCodeNaf1654776851803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_37552f955f40c7423baa07355e9"`);
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "companyTypeId" TO "codeNafId"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_aea16ff665e17395aeca7bf3645" FOREIGN KEY ("codeNafId") REFERENCES "code_naf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_aea16ff665e17395aeca7bf3645"`);
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "codeNafId" TO "companyTypeId"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_37552f955f40c7423baa07355e9" FOREIGN KEY ("companyTypeId") REFERENCES "code_naf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
