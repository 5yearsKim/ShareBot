import { aiMessageM } from "@/models/AiMessage";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import * as err from "@/errors";
import type { AiMessageT, ListAiMessageOptionT } from "@/types";


export async function listAiMessage(opt: ListAiMessageOptionT): Promise<ListData<AiMessageT>> {
  const table = aiMessageM.table;
  const limit = opt.limit ?? 30;
  let nextCursor: string|null = null;
  const getNextCursor = (item: AiMessageT): string => encodeCursor({ created_at: item.created_at });

  const fetched = await aiMessageM.find({
    builder: (qb, select) => {
      qb.orderByRaw(`${table}.created_at DESC`);
      qb.limit(limit);

      // cursor
      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where(`${table}.created_at`, "<", cursor.created_at);
      }
      // chatId
      if (opt.chatId) {
        qb.where(`${table}.chat_id`, "=", opt.chatId);
      } else {
        throw new err.InvalidDataE("chatId should be given to fetch message");
      }

      lookupBuilder(select, opt);
    }
  });

  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }

  return {
    data: fetched,
    nextCursor
  };

}
