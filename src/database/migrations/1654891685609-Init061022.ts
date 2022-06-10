import {MigrationInterface, QueryRunner} from "typeorm";

export class Init0610221654891685609 implements MigrationInterface {
    name = 'Init0610221654891685609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "code_naf" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_2cbce5bbebd1af5c700abb70f9b" UNIQUE ("code"), CONSTRAINT "PK_4d493d10e549610210c2b7740bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "companyName" character varying NOT NULL, "sirenNumber" numeric NOT NULL, "phone" numeric NOT NULL, "newsletter" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT '2', "status" "public"."user_status_enum" NOT NULL DEFAULT '1', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" text NOT NULL, "siretNumber" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "region" character varying NOT NULL, "zipcode" character varying NOT NULL, "country" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "website" character varying NOT NULL, "facebook" character varying NOT NULL, "instagram" character varying NOT NULL, "linkedin" character varying NOT NULL, "userId" uuid, "codeNafId" uuid, CONSTRAINT "UQ_70ffcfde701e2c9645e34be27d6" UNIQUE ("siretNumber"), CONSTRAINT "UQ_70ffcfde701e2c9645e34be27d6" UNIQUE ("siretNumber"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "family" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_cb945a3561693907692670cdb4e" UNIQUE ("name"), CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_aea16ff665e17395aeca7bf3645" FOREIGN KEY ("codeNafId") REFERENCES "code_naf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_aea16ff665e17395aeca7bf3645"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`DROP TABLE "family"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "code_naf"`);
    }

}
