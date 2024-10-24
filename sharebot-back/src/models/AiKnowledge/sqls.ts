import { SqlInjector } from "@/utils/orm";
import { knex } from "@/global/db";

export class AiKnowledgeSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
