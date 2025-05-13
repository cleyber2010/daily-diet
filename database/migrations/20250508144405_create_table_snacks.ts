import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("snacks", (table) => {
        table.uuid('id').primary();
        table.uuid('user_id');
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.text('name').notNullable();
        table.text('description').notNullable();
        table.boolean('isInside').notNullable();
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("snacks");
}

