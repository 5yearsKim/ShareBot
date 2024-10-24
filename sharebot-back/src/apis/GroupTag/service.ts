import { Injectable } from "@nestjs/common";
import { groupTagM } from "@/models/GroupTag";
import * as err from "@/errors";
import type { GroupTagT, GroupTagFormT, GetGroupTagOptionT, ListGroupTagOptionT } from "@/types";

@Injectable()
export class GroupTagService {
  constructor() {}


  async create(form: GroupTagFormT): Promise<GroupTagT> {
    const created = await groupTagM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async list(listOpt: ListGroupTagOptionT): Promise<ListData<GroupTagT>> {
    // const opt = listOpt;
    const fetched = await groupTagM.find({
      builder: (qb) => {
        qb.orderByRaw(`${groupTagM.table}.rank ASC NULLS LAST`);
      }
    });
    return { data: fetched, nextCursor: null };
  }

  async update(id: idT, form: Partial<GroupTagFormT>): Promise<GroupTagT> {
    const updated = await groupTagM.updateOne({ id }, form);
    if (!updated) {
      throw new err.NotAppliedE();
    }
    return updated;
  }

  async remove(id: idT): Promise<GroupTagT> {
    const removed = await groupTagM.deleteOne({ id });
    if (!removed) {
      throw new err.NotAppliedE();
    }
    return removed;
  }


}