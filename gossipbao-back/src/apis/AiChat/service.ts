import { Injectable } from "@nestjs/common";
import { aiChatM } from "@/models/AiChat";
import * as err from "@/errors";
import { listAiChat } from "./fncs/list_ai_chat";
import { AiChatT, AiChatFormT, ListAiChatOptionT } from "@/types";

@Injectable()
export class AiChatService {
  constructor() {}

  async list(listOpt: ListAiChatOptionT): Promise<ListData<AiChatT>> {
    return await listAiChat(listOpt);
  }

  async create(form: AiChatFormT): Promise<AiChatT> {
    const created = await aiChatM.create(form);
    if (!created) {
      throw new err.NotAppliedE("not created");
    }
    return created;
  }

  async findOrCreate(userId: idT): Promise<AiChatT> {
    const fetched = await aiChatM.findOne({ user_id: userId }, {
      builder: (qb) => {
        qb.orderBy("id", "DESC");
      }
    });

    if (fetched) {
      return fetched;
    }
    const form: AiChatFormT = {
      user_id: userId,
    };
    const created = await aiChatM.create(form);
    if (!created) {
      throw new err.NotAppliedE("not created");
    }
    return created;
  }
}