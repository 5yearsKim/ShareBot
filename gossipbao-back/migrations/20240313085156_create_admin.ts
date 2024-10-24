import { Knex } from "knex";

const table = "admins";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, function(t) {
    t.increments("id").primary().unsigned();
    t.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    t.dateTime("updated_at");

    t.integer("account_id").notNullable().references("accounts.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.boolean("is_super").defaultTo(false);

    t.unique("account_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table);
}