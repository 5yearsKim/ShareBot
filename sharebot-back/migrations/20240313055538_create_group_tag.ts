import type { Knex } from "knex";

const table = "group_tags";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(table, (t) => {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.string("label").notNullable();
    t.integer("rank");

    t.unique(["label"]);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(table);
}
