import type { AiMessageFormT } from "@/types";
import type { MessageT } from "./type";


export function aiMessagesToMessages(aiMessages: AiMessageFormT[]): MessageT[] {
  if (aiMessages.length > 10) {
    aiMessages = aiMessages.slice(0, 10);
  }
  aiMessages = aiMessages.reverse();
  return aiMessages.map<MessageT>((aiMsg) => {
    return {
      role: aiMsg.type,
      content: aiMsg.message ?? ".",
    };
  });
}