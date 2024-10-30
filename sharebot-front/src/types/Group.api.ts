import type { GroupT, GroupFormT, GetGroupOptionT, ListGroupOptionT } from "./Group";

// (POST) /
export type CreateRqs = {form: GroupFormT}
export type CreateRsp = GroupT

// (GET) /key/:key
export type GetByKeyRqs = GetGroupOptionT
export type GetByKeyRsp = GetData<GroupT>

// (GET) /:id
export type GetRqs = GetGroupOptionT
export type GetRsp = GetData<GroupT>

// (GET) /
export type ListRqs = ListGroupOptionT
export type ListRsp = ListData<GroupT>

// (PATCH) /:id
export type UpdateRqs = {form: Partial<GroupFormT>}
export type UpdateRsp = GroupT

// (POST) /thumbnail
export type UploadThumbnailRqs = null // {image: Express.Multer.File}
export type UploadThumbnailRsp = {key: string}

// (DELETE) /thumbnail
export type DeleteThumbnailRqs = {key: string}
export type DeleteThumbnailRsp = null

// (POST) /file
export type UploadFileRqs = null
export type UploadFileRsp = {key: string}