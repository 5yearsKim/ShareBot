import type { Knex } from "knex";

const table = "ai_chats";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table, (t) => {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.integer("user_id").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.string("title");
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(table);
}

