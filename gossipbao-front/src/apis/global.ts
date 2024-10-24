import * as R from "@/types/Auth.api";
import { server } from "@/system/server";
import { API_URL } from "@/config";
import { EventSourcePolyfill } from "event-source-polyfill";
import { userTH } from "@/system/token_holders";
import type { AiMessageT, GroupT } from "@/types";

const root = "/";
const heartbeatTimeout = 20 * 1000;

type GeneratorT = string|undefined;

export function botRespond(
  group: GroupT,
  messages: AiMessageT[],
  generatorType: GeneratorT|undefined = undefined,
): EventSource {
  const data = JSON.stringify({
    group,
    messages,
    generatorType,
  });
  const tokenInfo = userTH.get();
  return new EventSourcePolyfill(`${API_URL}/bot/respond?data=${data}`, { headers: { "x-user-token": tokenInfo?.token ?? "" }, heartbeatTimeout } );
}

export function botTrigger(
  group: GroupT,
  messages:AiMessageT[],
  generatorType: GeneratorT|undefined = undefined,
): EventSource {
  const data = JSON.stringify({
    group,
    messages,
    generatorType,
  });
  const tokenInfo = userTH.get();
  return new EventSourcePolyfill(`${API_URL}/bot/trigger?data=${data}`, { headers: { "x-user-token": tokenInfo?.token ?? "" }, heartbeatTimeout } );
}
