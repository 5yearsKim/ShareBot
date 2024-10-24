import { GroupTagT, GroupTagFormT, ListGroupTagOptionT, GetGroupTagOptionT } from "./GroupTag";


// (GET) /
export type ListRqs = ListGroupTagOptionT
export type ListRsp = ListData<GroupTagT>


// (POST) /
export type CreateRqs = {form: GroupTagFormT}
export type CreateRsp = GroupTagT

// (GET) /:id
export type GetRqs = GetGroupTagOptionT
export type GetRsp = GetData<GroupTagT>

// (PATCH) /:id
export type UpdateRqs = {form: Partial<GroupTagFormT>}
export type UpdateRsp = GroupTagT

// (DELETE) /:id
export type DeleteRqs = null
export type DeleteRsp = GroupTagT

// (PUT) /rerank
export type RerankRqs = {tagIds: idT[]}
export type RerankRsp = GroupTagT[]
