import { Injectable } from "@nestjs/common";
import { groupAdminM } from "@/models/GroupAdmin";
import * as err from "@/errors";
import type { GroupAdminT, GroupAdminFormT } from "@/types";

@Injectable()
export class GroupAdminService {
  constructor() {}

  async getMe(userId: idT, groupId: idT): Promise<GroupAdminT|null> {
    const fetched = await groupAdminM.findOne({ user_id: userId, group_id: groupId });
    return fetched;
  }

  async create(form: GroupAdminFormT): Promise<GroupAdminT> {
    const created = await groupAdminM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

}