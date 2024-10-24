import { z } from "zod";
import { baseModelSchema, insertFormSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const xGroupGroupTagFormSchema = insertFormSchema.extend({
  tag_id: z.number().int(),
  group_id: z.number().int(),
  rank: z.number().int().nullish(),
});

export const xGroupGroupTagSchema = baseModelSchema.extend(xGroupGroupTagFormSchema.shape);


const tgKey = "XGroupGroupTag";

TG.add(tgKey, "XGroupGroupTagFormT", xGroupGroupTagFormSchema);
TG.add(tgKey, "XGroupGroupTagT", xGroupGroupTagSchema);

