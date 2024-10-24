import { DataModel } from "@/utils/orm";
import type { AiChatFormT, AiChatT } from "@/types/AiChat";


const table = "ai_chats";
export const aiChatM = new DataModel<AiChatFormT, AiChatT>(table);


