import { SqlInjector } from "@/utils/orm";
import { knex } from "@/global/db";

export class AiChatSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  lastMessage() {
    return knex.select(knex.raw("TO_JSON(am)"))
      .from("ai_messages AS am")
      .whereRaw(`am.chat_id = ${this.table}.id`)
      .orderBy("am.id", "DESC")
      .limit(1)
      .as("last_message");

  }
}
