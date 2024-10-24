import { Injectable } from "@nestjs/common";
import { aiMessageM } from "@/models/AiMessage";
import * as err from "@/errors";
import { listAiMessage } from "./fncs/list_ai_message";
import type { AiMessageFormT, AiMessageT, ListAiMessageOptionT } from "@/types";

@Injectable()
export class AiMessageService {
  constructor() {}

  async create(form: AiMessageFormT): Promise<AiMessageT> {
    const created = await aiMessageM.create(form);
    if (!created) {
      throw new err.NotAppliedE("not created");
    }
    return created;
  }

  async list(listOpt: ListAiMessageOptionT): Promise<ListData<AiMessageT>> {
    return await listAiMessage(listOpt);
  }
}