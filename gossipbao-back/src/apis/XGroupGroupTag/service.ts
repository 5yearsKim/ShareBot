import { Injectable } from "@nestjs/common";
import { xGroupGroupTagM } from "@/models/XGroupGroupTag";
import * as err from "@/errors";
import type { XGroupGroupTagFormT, XGroupGroupTagT } from "@/types/XGroupGroupTag";

@Injectable()
export class XGroupGroupTagService {
  constructor() {}

  async create(form: XGroupGroupTagFormT): Promise<XGroupGroupTagT> {
    const created = await xGroupGroupTagM.upsert(form, { onConflict: ["group_id", "tag_id"] });
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async resetByGroup(groupId: number): Promise<void> {
    await xGroupGroupTagM.deleteMany({ group_id: groupId });
  }
}