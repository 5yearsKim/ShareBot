import { SqlInjector } from "@/utils/orm";
// import { knex } from "@/global/db";

export class GroupSecretSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
