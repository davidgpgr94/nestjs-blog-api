import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAttachedFilesTable1610192757054 implements MigrationInterface {
    name = 'CreateAttachedFilesTable1610192757054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
        await queryRunner.query(`CREATE TABLE "attached_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "filename" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "postId" integer NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_60479e70986befe8282b9b8cd0" ON "attached_file" ("postId") `);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
        await queryRunner.query(`DROP INDEX "IDX_60479e70986befe8282b9b8cd0"`);
        await queryRunner.query(`CREATE TABLE "temporary_attached_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "filename" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "postId" integer NOT NULL, CONSTRAINT "FK_60479e70986befe8282b9b8cd04" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_attached_file"("id", "path", "filename", "createdAt", "updatedAt", "postId") SELECT "id", "path", "filename", "createdAt", "updatedAt", "postId" FROM "attached_file"`);
        await queryRunner.query(`DROP TABLE "attached_file"`);
        await queryRunner.query(`ALTER TABLE "temporary_attached_file" RENAME TO "attached_file"`);
        await queryRunner.query(`CREATE INDEX "IDX_60479e70986befe8282b9b8cd0" ON "attached_file" ("postId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_60479e70986befe8282b9b8cd0"`);
        await queryRunner.query(`ALTER TABLE "attached_file" RENAME TO "temporary_attached_file"`);
        await queryRunner.query(`CREATE TABLE "attached_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "filename" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "postId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "attached_file"("id", "path", "filename", "createdAt", "updatedAt", "postId") SELECT "id", "path", "filename", "createdAt", "updatedAt", "postId" FROM "temporary_attached_file"`);
        await queryRunner.query(`DROP TABLE "temporary_attached_file"`);
        await queryRunner.query(`CREATE INDEX "IDX_60479e70986befe8282b9b8cd0" ON "attached_file" ("postId") `);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
        await queryRunner.query(`DROP INDEX "IDX_60479e70986befe8282b9b8cd0"`);
        await queryRunner.query(`DROP TABLE "attached_file"`);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "hashedPassword" varchar NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "role" varchar CHECK( role IN ('user','admin') ) NOT NULL DEFAULT ('user'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role") SELECT "id", "login", "hashedPassword", "firstname", "lastname", "createdAt", "updatedAt", "role" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `);
    }

}
