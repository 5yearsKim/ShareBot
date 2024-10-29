import { Injectable } from "@nestjs/common";
import { groupFileM } from "@/models/GroupFile";
import { listGroupFile } from "./fncs/list_group_file";
import { deleteFile, getFile } from "@/utils/media";
import * as EngineApi from "@/engine/apis";
import * as err from "@/errors";
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

  async update(id: idT, form: Partial<GroupFileFormT>): Promise<GroupFileT> {
    const updated = await groupFileM.updateOne({ id }, form);
    if (!updated) {
      throw new err.NotAppliedE();
    }
    return updated;
  }


  async remove(id: idT): Promise<GroupFileT> {
    const removed = await groupFileM.deleteOne({ id });

    if (!removed) {
      throw new err.NotAppliedE();
    }

    await deleteFile(removed.path);

    return removed;
  }

  async pdf2text(pdfKey: string): Promise<string> {
    const pdfBlob = await getFile(pdfKey);

    const file = new File([pdfBlob], "document.pdf", { type: "application/pdf" });

    const { text } = await EngineApi.docToText(file);
    return text;
  }

  async createFileToEngine(groupFile: GroupFileT): Promise<any> {
    const { points } = await EngineApi.createFile({
      id: groupFile.id,
      groupId: groupFile.group_id,
      userId: groupFile.user_id ?? -1,
      content: groupFile.content ?? "",
    });
    return points;
  }

  async deleteFileToEngine(id: idT): Promise<void> {
    await EngineApi.deleteFile({ id });
  }
}