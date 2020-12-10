import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePosts1607633702774 implements MigrationInterface {
    name = 'CreatePosts1607633702774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
