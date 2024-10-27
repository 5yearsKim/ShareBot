import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const groupFileFormSchema = insertFormSchema.extend({
  user_id: z.number(),
  group_id: z.number(),

  path: z.string(),
  mime_type: z.string().nullish(),
  name: z.string(),
  content: z.string().nullish(),
});

export const groupFileSchema = baseModelSchema.extend({
  ...groupFileFormSchema.shape
});

export const getGroupFileOptionSchema = getOptionSchema.extend({});
export const listGroupFileOptionSchema = listOptionSchema.extend({
  ...getGroupFileOptionSchema.shape,
  sort: z.enum(["recent", "old"]),
}).partial();


const tgKey = "GroupFile";


TG.add(tgKey, "GroupFileFormT", groupFileFormSchema);
TG.add(tgKey, "GroupFileT", groupFileSchema);

TG.add(tgKey, "GetGroupFileOptionT", getGroupFileOptionSchema);
TG.add(tgKey, "ListGroupFileOptionT", listGroupFileOptionSchema);