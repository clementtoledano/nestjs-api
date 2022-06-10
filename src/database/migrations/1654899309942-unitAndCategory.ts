import {MigrationInterface, QueryRunner} from "typeorm";

export class unitAndCategory1654899309942 implements MigrationInterface {
    name = 'unitAndCategory1654899309942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Unit_unitcategory_enum" AS ENUM('1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TYPE "public"."Unit_countrycode_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "Unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "unitCategory" "public"."Unit_unitcategory_enum" NOT NULL, "countryCode" "public"."Unit_countrycode_enum" NOT NULL, CONSTRAINT "UQ_8f96d61fcf25788d8f7df98e347" UNIQUE ("name", "symbol"), CONSTRAINT "PK_0a83556fc363a57bdeee23f9a9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" TYPE "public"."user_status_enum" USING "status"::"text"::"public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum_old" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" TYPE "public"."user_status_enum_old" USING "status"::"text"::"public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum_old" RENAME TO "user_status_enum"`);
        await queryRunner.query(`DROP TABLE "Unit"`);
        await queryRunner.query(`DROP TYPE "public"."Unit_countrycode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Unit_unitcategory_enum"`);
    }

}
