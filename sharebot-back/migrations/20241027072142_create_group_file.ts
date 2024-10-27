import { Knex } from "knex";

const table = "group_files";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, function(t) {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.integer("user_id").notNullable().references("users.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.integer("group_id").notNullable().references("groups.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.text("path").notNullable();
    t.string("mime_type");
    t.string("name").notNullable();
    t.text("content");

    t.index("user_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table);
}