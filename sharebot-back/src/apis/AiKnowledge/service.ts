import { Injectable } from "@nestjs/common";
import * as err from "@/errors";
import { aiKnowledgeM } from "@/models/AiKnowledge";
import * as EngineApi from "@/engine/apis";
import { listAiKnowledge } from "./fncs/list_ai_knowledge";
import { AiKnowledgeT, AiKnowledgeFormT, ListAiKnowledgeOptionT } from "@/types/AiKnowledge";

@Injectable()
export class AiKnowledgeService {
  constructor() {}

  async get(id: idT): Promise<AiKnowledgeT> {
    const fetched = await aiKnowledgeM.findOne({ id });
    if (!fetched) {
      throw new err.NotExistE();
    }
    return fetched;
  }

  async create(form: AiKnowledgeFormT): Promise<AiKnowledgeT> {
    const created = await aiKnowledgeM.create(form);
    if (!created) {
      throw new err.NotAppliedE("not created");
    }
    const { points } = await EngineApi.createKnowledge({
      id: created.id,
      groupId: created.group_id,
      userId: created.user_id ?? -1,
      content: created.content,
    });

    await aiKnowledgeM.updateOne(
      { id: created.id },
      { applied_info: { applied_at: new Date().toISOString(), ids: points.map((point: any) => point.id) } },
    );

    return created;
  }

  async list(listOpt: ListAiKnowledgeOptionT): Promise<ListData<AiKnowledgeT>> {
    return await listAiKnowledge(listOpt);
  }

  async remove(id: idT): Promise<AiKnowledgeT> {
    await EngineApi.deleteKnowledge({ id });
    const removed = await aiKnowledgeM.deleteOne({ id });
    if (!removed) {
      throw new err.NotAppliedE("not removed");
    }
    return removed;
  }
}