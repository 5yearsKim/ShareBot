import { Knex } from "knex";

const table = "x_group_group_tag";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, function(t) {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.integer("tag_id").notNullable().references("group_tags.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.integer("group_id").notNullable().references("groups.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.integer("rank");

    t.unique(["group_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table);
}