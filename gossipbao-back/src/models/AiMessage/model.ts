import { DataModel } from "@/utils/orm";
import type { AiMessageFormT, AiMessageT } from "@/types/AiMessage";


const table = "ai_messages";
export const aiMessageM = new DataModel<AiMessageFormT, AiMessageT>(table);


