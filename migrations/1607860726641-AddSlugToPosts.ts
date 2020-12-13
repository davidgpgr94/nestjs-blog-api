import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlugToPosts1607860726641 implements MigrationInterface {
    name = 'AddSlugToPosts1607860726641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "slug" varchar NOT NULL, CONSTRAINT "UQ_415175ed3348fd59e285907a40c" UNIQUE ("slug"))`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "text", "createdAt", "updatedAt", "slug") SELECT "id", "title", "text", "createdAt", "updatedAt", ("title" || " " || datetime('now')) FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "text", "createdAt", "updatedAt") SELECT "id", "title", "text", "createdAt", "updatedAt" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
    }

}
