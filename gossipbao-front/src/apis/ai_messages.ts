import { server } from "@/system/server";
import * as R from "@/types/AiMessage.api";
import type { AiMessageT, AiMessageFormT, ListAiMessageOptionT } from "@/types/AiMessage";

const root = "/ai-messages";


export async function create(form: AiMessageFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}`, body);
  return rsp.data;
}

export async function list(listOpt: ListAiMessageOptionT): Promise<R.ListRsp> {
  const params: R.ListRqs = listOpt;
  const rsp = await server.get(`${root}`, { params });
  return rsp.data;
}
