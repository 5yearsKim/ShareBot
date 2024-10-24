import { aiChatM, AiChatSqls } from "@/models/AiChat";
import type { GetAiChatOptionT } from "@/types";

export function lookupBuilder(select: any[], opt: GetAiChatOptionT): void {
  const sqls = new AiChatSqls(aiChatM.table);

  if (opt.$lastMessage) {
    select.push(sqls.lastMessage());
  }
}