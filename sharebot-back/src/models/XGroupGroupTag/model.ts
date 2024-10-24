import { DataModel } from "@/utils/orm";
import type { XGroupGroupTagFormT, XGroupGroupTagT } from "@/types/XGroupGroupTag";


const table = "x_group_group_tag";
export const xGroupGroupTagM = new DataModel<XGroupGroupTagFormT, XGroupGroupTagT>(table);


