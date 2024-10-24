import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const adminFormSchema = insertFormSchema.extend({
  account_id: z.number().int(),
  is_super: z.boolean(),
});

export const adminSchema = baseModelSchema.extend(adminFormSchema.shape);

export const getAdminOptionSchema = getOptionSchema.extend({});
export const listAdminOptionSchema = listOptionSchema.extend({
  ...getAdminOptionSchema.shape,
});


const tgKey = "Admin";

TG.add(tgKey, "AdminFormT", adminFormSchema);
TG.add(tgKey, "AdminT", adminSchema);

TG.add(tgKey, "GetAdminOptionT", getAdminOptionSchema);
TG.add(tgKey, "ListAdminOptionT", listAdminOptionSchema);

