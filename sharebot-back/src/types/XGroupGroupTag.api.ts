import type { XGroupGroupTagFormT, XGroupGroupTagT } from "./XGroupGroupTag";


// (POST) /
export type CreateRqs = {form: XGroupGroupTagFormT}
export type CreateRsp = XGroupGroupTagT


// (POST) /reset-by-group
export type ResetByGroupRqs = {groupId: idT}
export type ResetByGroupRsp = boolean
