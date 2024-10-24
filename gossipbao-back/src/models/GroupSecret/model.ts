import { DataModel } from "@/utils/orm";
import type { GroupSecretFormT, GroupSecretT } from "@/types/GroupSecret";


const table = "group_secrets";
export const groupSecretM = new DataModel<GroupSecretFormT, GroupSecretT>(table);


