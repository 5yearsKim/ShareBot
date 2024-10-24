import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const aiChatFormSchema = insertFormSchema.extend({
  user_id: z.number().nullable(),
  title: z.string().nullish(),
});

export const aiChatSchema = baseModelSchema.extend(aiChatFormSchema.shape);

export const getAiChatOptionSchema = getOptionSchema.extend({
  $lastMessage: z.coerce.boolean(),
}).partial();
export const listAiChatOptionSchema = listOptionSchema.extend({
  ...getAiChatOptionSchema.shape,
}).partial();


const tgKey = "AiChat";

TG.add(tgKey, "AiChatFormT", aiChatFormSchema);
TG.add(tgKey, "_AiChatT", aiChatSchema, { private: true });

TG.add(tgKey, "GetAiChatOptionT", getAiChatOptionSchema);
TG.add(tgKey, "ListAiChatOptionT", listAiChatOptionSchema);

