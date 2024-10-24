import { SqlInjector } from "@/utils/orm";
import { knex, type QueryBuilder } from "@/global/db";

export class GroupSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  admin(accountId: idT): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(ga)"))
      .from("group_admins AS ga")
      .leftJoin("users AS u", "u.id", "ga.user_id")
      .whereNull("u.deleted_at")
      .whereRaw(`u.account_id = ${accountId} AND ga.group_id = ${this.table}.id`)
      .as("admin");
  }

  tags(): QueryBuilder {
    return knex.select(knex.raw(`
    COALESCE(ARRAY_TO_JSON(ARRAY_AGG(gt ORDER BY gt.rank ASC NULLS LAST)), '[]'::JSON)
    FROM group_tags AS gt
    INNER JOIN x_group_group_tag AS xgt ON xgt.tag_id = gt.id
    WHERE xgt.group_id = ${this.table}.id
    `)).as("tags");
  }

  secret(): QueryBuilder {
    return knex.select(knex.raw("json_build_object('hint', gs.hint, 'group_id', gs.group_id)"))
      .from("group_secrets AS gs")
      .whereRaw(`gs.group_id = ${this.table}.id`)
      .as("secret");
  }
}
