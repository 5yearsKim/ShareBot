import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const aiKnowledgeFormSchema = insertFormSchema.extend({
  group_id: z.number().int(),
  user_id: z.number().int().nullable(),
  content: z.string(),
  applied_info: z.object({
    applied_at: z.string(),
    ids: z.array(z.string()),
  }).nullable(),
});

export const aiKnowledgeSchema = baseModelSchema.extend(aiKnowledgeFormSchema.shape);

export const getAiKnowledgeOptionSchema = getOptionSchema.extend({}).partial();
export const listAiKnowledgeOptionSchema = listOptionSchema.extend({
  ...getAiKnowledgeOptionSchema.shape,
  userId: z.coerce.number().int(),
}).partial();


const tgKey = "AiKnowledge";

TG.add(tgKey, "AiKnowledgeFormT", aiKnowledgeFormSchema);
TG.add(tgKey, "AiKnowledgeT", aiKnowledgeSchema);

TG.add(tgKey, "GetAiKnowledgeOptionT", getAiKnowledgeOptionSchema);
TG.add(tgKey, "ListAiKnowledgeOptionT", listAiKnowledgeOptionSchema);

