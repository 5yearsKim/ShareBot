import { DataModel } from "@/utils/orm";
import type { GroupTagFormT, GroupTagT } from "@/types/GroupTag";


const table = "group_tags";
export const groupTagM = new DataModel<GroupTagFormT, GroupTagT>(table);


