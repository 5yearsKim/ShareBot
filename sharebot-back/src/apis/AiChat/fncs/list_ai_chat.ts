import { aiChatM } from "@/models/AiChat";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import type { AiChatT, ListAiChatOptionT } from "@/types/AiChat";

export async function listAiChat(opt: ListAiChatOptionT): Promise<ListData<AiChatT>> {
  const table = aiChatM.table;
  const limit = opt.limit ?? 30;
  let nextCursor: null|string = null;
  let getNextCursor: (item: AiChatT) => string|null = () => null;

  const fetched = await aiChatM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      // sort
      qb.orderByRaw(`${table}.created_at DESC`);
      getNextCursor = (item) => encodeCursor({
        created_at: item.created_at,
      });
      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("created_at", "<", cursor.created_at);
      }

      // userId
      if (opt.userId) {
        qb.where("user_id", opt.userId);
      }

      // lookup
      lookupBuilder(select, opt);
    }
  });


  if (fetched.length >= limit) {
    const last = fetched[fetched.length - 1];
    nextCursor = getNextCursor(last);
  }

  return {
    data: fetched,
    nextCursor
  };
}