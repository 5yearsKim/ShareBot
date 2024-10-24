import type { Knex } from "knex";

const table = "ai_knowledges";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table, (t) => {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.integer("group_id").notNullable().references("groups.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.integer("user_id").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.text("content").notNullable();
    t.json("applied_info");
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(table);
}

