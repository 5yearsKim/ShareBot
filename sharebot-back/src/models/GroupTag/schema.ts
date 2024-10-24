import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const groupTagFormSchema = insertFormSchema.extend({
  label: z.string(),
  rank: z.number().int().nullish(),
});

export const groupTagSchema = baseModelSchema.extend(groupTagFormSchema.shape);

export const getGroupTagOptionSchema = getOptionSchema.extend({});
export const listGroupTagOptionSchema = listOptionSchema.extend({
  ...getGroupTagOptionSchema.shape,
}).partial();


const tgKey = "GroupTag";

TG.add(tgKey, "GroupTagFormT", groupTagFormSchema);
TG.add(tgKey, "GroupTagT", groupTagSchema);

TG.add(tgKey, "GetGroupTagOptionT", getGroupTagOptionSchema);
TG.add(tgKey, "ListGroupTagOptionT", listGroupTagOptionSchema);

