import axios, { type AxiosResponse } from "axios";
import { env } from "@/env";
import { MessageT } from "./type";


const engine = axios.create({
  baseURL: env.ENGINE_URL,
  timeout: 10000,
});

export async function createKnowledge(
  opt: {
    id: idT,
    groupId: idT,
    userId: idT,
    content: string,
  }
): Promise<any> {
  const rsp = await engine.post("/knowledge", {
    id: opt.id,
    group_id: opt.groupId,
    user_id: opt.userId,
    content: opt.content,
  });
  return rsp.data;
}

export async function deleteKnowledge(
  opt: {
    id: idT,
  }
): Promise<any> {
  const rsp = await engine.delete(`/knowledge/${opt.id}`);
  return rsp.data;

}

export function botTriggerStream(
  opt: {
    userId: idT,
    group: { id: idT, name: string},
    messages: MessageT[],
    generatorType?: string,
  }
): Promise<AxiosResponse> {

  const body = {
    user_id: opt.userId,
    group: opt.group,
    messages: opt.messages,
    generator_type: opt.generatorType,
  };
  return engine.post("/bot/trigger", body, { responseType: "stream", timeout: 20 * 1000 });
}


export function botRespondStream(
  opt: {
    userId: idT
    group: { id: idT, name: string},
    messages: MessageT[],
    generatorType?: string,
  }
): Promise<AxiosResponse> {

  const body = {
    user_id: opt.userId,
    group: opt.group,
    messages: opt.messages,
    generator_type: opt.generatorType,
  };

  // console.log('stream:', body);
  return engine.post("/bot/respond", body, { responseType: "stream", timeout: 20 * 1000 });
}