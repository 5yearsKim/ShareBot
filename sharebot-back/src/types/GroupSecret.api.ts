import type { GroupSecretT, GroupSecretFormT } from "./GroupSecret";

// (GET) /by-group/:groupId
export type GetByGroupRqs = null
export type GetByGroupRsp = GetData<GroupSecretT|null>

// (POST) /
export type CreateRqs = {form: GroupSecretFormT}
export type CreateRsp = GroupSecretT

// (DELETE) /by-group/:groupId
export type RemoveByGroupRqs = null
export type RemoveByGroupRsp = GroupSecretT