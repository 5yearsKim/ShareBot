import type { Knex } from "knex";

const table = "ai_messages";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table, (t) => {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.integer("chat_id").notNullable().references("ai_chats.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.enu("type", ["bot", "user"]).notNullable();
    t.integer("sender_id").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.text("message");
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(table);
}

