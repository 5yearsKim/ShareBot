import { DataModel } from "@/utils/orm";
import type { GroupFileFormT, GroupFileT } from "@/types/GroupFile";


const table = "group_files";
export const groupFileM = new DataModel<GroupFileFormT, GroupFileT>(table);


