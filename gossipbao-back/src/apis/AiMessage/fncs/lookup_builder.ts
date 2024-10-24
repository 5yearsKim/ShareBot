import { aiMessageM, AiMessageSqls } from "@/models/AiMessage";
import type { GetAiMessageOptionT } from "@/types";


export function lookupBuilder(select: any[], opt: GetAiMessageOptionT) {
  const sqls = new AiMessageSqls(aiMessageM.table);

}