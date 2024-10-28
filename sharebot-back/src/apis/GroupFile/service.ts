import { Injectable } from "@nestjs/common";
import * as err from "@/errors";
import { groupFileM } from "@/models/GroupFile";
import { listGroupFile } from "./fncs/list_group_file";
import { deleteFile } from "@/utils/media";
import type { GroupFileFormT, GroupFileT, ListGroupFileOptionT } from "@/types";

@Injectable()
export class GroupFileService {
  constructor() {}

  async create(form: GroupFileFormT): Promise<GroupFileT> {
    const created = await groupFileM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async list(listOpt: ListGroupFileOptionT): Promise<ListData<GroupFileT>> {
    return await listGroupFile(listOpt);
  }

  async remove(id: idT): Promise<GroupFileT> {
    const removed = await groupFileM.deleteOne({ id });

    if (!removed) {
      throw new err.NotAppliedE();
    }

    await deleteFile(removed.path);

    return removed;
  }
}