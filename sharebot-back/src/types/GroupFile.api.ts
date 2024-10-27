import {
  GroupFileFormT, GroupFileT, ListGroupFileOptionT,
} from "./GroupFile";

// (GET) /
export type ListRqs = ListGroupFileOptionT
export type ListRsp = ListData<GroupFileT>


// (POST) /
export type CreateRqs = {form: GroupFileFormT}
export type CreateRsp = GroupFileT


// (DELETE) /:id
export type DeleteRqs = null
export type DeleteRsp = GroupFileT