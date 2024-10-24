import {
  GroupAdminT
} from "./GroupAdmin";

// (GET) /me
export type GetMeRqs = {groupId: idT}
export type GetMeRsp = GetData<GroupAdminT|null>
