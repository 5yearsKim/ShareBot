import { SqlInjector } from "@/utils/orm";
// import { knex } from "@/global/db";

export class XGroupGroupTagSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
