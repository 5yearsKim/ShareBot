import { z } from "zod";
import { baseModelSchema, insertFormSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const GroupSecretFormSchema = insertFormSchema.extend({
  group_id: z.number(),
  hint: z.string().nullish(),
  password: z.string(),
});
export const GroupSecretSchema = baseModelSchema.extend(GroupSecretFormSchema.shape);


const tgKey = "GroupSecret";

TG.add(tgKey, "GroupSecretFormT", GroupSecretFormSchema);
TG.add(tgKey, "GroupSecretT", GroupSecretSchema);

