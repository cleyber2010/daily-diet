import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", table => {
        table.uuid("id").primary().notNullable();
        table.text("firstName").notNullable();
        table.text("lastName").notNullable();
        table.text("email").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

