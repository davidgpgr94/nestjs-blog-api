import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1608913716329 implements MigrationInterface {
  name = 'CreateUserTable1608913716329'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
    await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
    await queryRunner.query(`CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_cd1bddce36edc3e766798eab37"`);
    await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }

}
