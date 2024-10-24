import { Injectable } from "@nestjs/common";
import { groupSecretM } from "@/models/GroupSecret";
import * as err from "@/errors";
import type { GroupSecretFormT, GroupSecretT } from "@/types";

@Injectable()
export class GroupSecretService {
  constructor() {}

  async getByGroup(groupId: idT): Promise<GroupSecretT|null> {
    const fetched = await groupSecretM.findOne({ group_id: groupId });
    return fetched;
  }

  async create(form: GroupSecretFormT): Promise<GroupSecretT> {
    const created = await groupSecretM.upsert(form, { onConflict: ["group_id"] });
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async removeByGroup(groupId: idT): Promise<GroupSecretT> {
    const removed = await groupSecretM.deleteOne({ group_id: groupId });
    if (!removed) {
      throw new err.NotAppliedE();
    }
    return removed;
  }


}