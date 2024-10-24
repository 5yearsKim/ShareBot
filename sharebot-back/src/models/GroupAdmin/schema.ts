import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const groupAdminFormSchema = insertFormSchema.extend({
  user_id: z.number().int(),
  group_id: z.number().int(),

  is_super: z.boolean().nullable(),
});

export const groupAdminSchema = baseModelSchema.extend(groupAdminFormSchema.shape);

export const getGroupAdminOptionSchema = getOptionSchema.extend({});
export const listGroupAdminOptionSchema = listOptionSchema.extend({
  ...getGroupAdminOptionSchema.shape,
}).partial();


const tgKey = "GroupAdmin";

TG.add(tgKey, "GroupAdminFormT", groupAdminFormSchema);
TG.add(tgKey, "GroupAdminT", groupAdminSchema);

TG.add(tgKey, "GetGroupAdminOptionT", getGroupAdminOptionSchema);
TG.add(tgKey, "ListGroupAdminOptionT", listGroupAdminOptionSchema);

