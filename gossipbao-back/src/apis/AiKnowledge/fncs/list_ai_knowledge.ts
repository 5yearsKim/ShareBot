import { aiKnowledgeM } from "@/models/AiKnowledge";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import type { AiKnowledgeT, ListAiKnowledgeOptionT } from "@/types/AiKnowledge";

export async function listAiKnowledge(opt: ListAiKnowledgeOptionT): Promise<ListData<AiKnowledgeT>> {
  const table = aiKnowledgeM.table;
  const limit = opt.limit ?? 30;
  let nextCursor: null|string = null;
  let getNextCursor: (item: AiKnowledgeT) => string|null = () => null;

  const fetched = await aiKnowledgeM.find({
    builder: (qb) => {
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