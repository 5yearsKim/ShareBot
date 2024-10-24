import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const groupProtectionEnum = z.enum(["public", "protected", "private"]);

const groupFormZ = {
  key: z.string().min(1).max(32),
  name: z.string().min(1).max(32),
  short_name: z.string().max(32).nullish(),
  avatar_path: z.string().nullish(),
  description: z.string().nullish(),
  protection: groupProtectionEnum,
  theme_color: z.string().nullish(),
  deleted_at: z.coerce.date().nullish(),
  use_point: z.boolean().optional(),
  allow_create_board: z.boolean().optional(),
  locale: z.string().nullish(),
};

export const groupFormSchema = insertFormSchema.extend(groupFormZ);

export const groupSchema = baseModelSchema.extend(groupFormZ);

export const getGroupOptionSchema = getOptionSchema.extend({
  accountId: z.number().int(),
  $admin: z.coerce.boolean(),
  $tags: z.coerce.boolean(),
  $secret: z.coerce.boolean(),
}).partial();
export const listGroupOptionSchema = listOptionSchema.extend({
  ...getGroupOptionSchema.shape,
  protection: groupProtectionEnum,
  joined: z.enum(["except", "only"]),
  admining: z.enum(["except", "only"]),
  sort: z.enum(["recent", "old"]),
  search: z.string(),
  tagId: z.coerce.number().int(),
}).partial();


const tgKey = "Group";

TG.add(tgKey, "GroupProtectionT", groupProtectionEnum);
TG.add(tgKey, "GroupFormT", groupFormSchema);
TG.add(tgKey, "_GroupT", groupSchema, { private: true });


TG.add(tgKey, "GetGroupOptionT", getGroupOptionSchema);
TG.add(tgKey, "ListGroupOptionT", listGroupOptionSchema);
