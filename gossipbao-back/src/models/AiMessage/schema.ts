import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const aiMessageFormSchema = insertFormSchema.extend({
  chat_id: z.number().int().positive(),
  type: z.enum(["bot", "user"]),
  sender_id: z.number().int().positive().nullable(),
  message: z.string().nullish(),
});
export const aiMessageSchema = baseModelSchema.extend(
  aiMessageFormSchema.shape
);

export const getAiMessageOptionSchema = getOptionSchema.extend({
  $sender: z.coerce.boolean(),
}).partial();
export const listAiMessageOptionSchema = listOptionSchema.extend({
  ...getAiMessageOptionSchema.shape,
  chatId: z.coerce.number().int().positive(),
}).partial();


const tgKey = "AiMessage";

TG.add(tgKey, "AiMessageFormT", aiMessageFormSchema);
TG.add(tgKey, "_AiMessageT", aiMessageSchema, { private: true });

TG.add(tgKey, "GetAiMessageOptionT", getAiMessageOptionSchema);
TG.add(tgKey, "ListAiMessageOptionT", listAiMessageOptionSchema);
