import { server } from "@/system/server";
import * as R from "@/types/AiChat.api";
import type { AiChatT, AiChatFormT, ListAiChatOptionT } from "@/types/AiChat";

const root = "/ai-chats";

export async function findOrCreate(): Promise<R.FindOrCreateRsp> {
  const rsp = await server.post(`${root}/find-or-create`);
  return rsp.data;
}

export async function create(form: AiChatFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}/`, body);
  return rsp.data;
}

export async function list(listOpt: ListAiChatOptionT): Promise<R.ListRsp> {
  const params: R.ListRqs = listOpt;
  const rsp = await server.get(`${root}`, { params });
  return rsp.data;
}

