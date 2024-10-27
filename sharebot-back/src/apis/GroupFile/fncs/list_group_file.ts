import { groupFileM } from "@/models/GroupFile";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import * as err from "@/errors";
import type { GroupFileT, ListGroupFileOptionT } from "@/types/GroupFile";


export async function listGroupFile(opt: ListGroupFileOptionT) : Promise<ListData<GroupFileT>> {

  const table = groupFileM.table;
  const limit = opt.limit || 30;

  let nextCursor: null|string = null;
  let getNextCursor: (item: GroupFileT) => string|null = () => null;

  const fetched = await groupFileM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      // sort
      switch (opt.sort || "recent") {
      case "recent":
        qb.orderByRaw(`${table}.created_at DESC`);
        getNextCursor = (item) => encodeCursor({
          created_at: item.created_at,
        });
        if (opt.cursor) {
          const cursor = decodeCursor(opt.cursor);
          qb.where("created_at", "<", cursor.created_at);
        }
        break;
      case "old":
        qb.orderBy(`${table}.created_at ASC`);
        getNextCursor = (item) => encodeCursor({
          created_at: item.created_at,
        });
        if (opt.cursor) {
          const cursor = decodeCursor(opt.cursor);
          qb.where("created_at", ">", cursor.created_at);
        }
        break;
      default:
        throw new err.InvalidDataE("invalid sort option");
      }
    }
  });


  if (fetched.length >= limit) {
    const last = fetched[fetched.length - 1];
    nextCursor = getNextCursor(last);
  }

  return {
    data: fetched,
    nextCursor,
  };
}