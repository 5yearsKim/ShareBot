import { AiChatFormT, AiChatT, ListAiChatOptionT } from "./AiChat";


// (POST) /find-or-create
export type FindOrCreateRqs = null
export type FindOrCreateRsp = AiChatT

// (POST) /
export type CreateRqs = {form: AiChatFormT}
export type CreateRsp = AiChatT

// (GET) /
export type ListRqs = ListAiChatOptionT
export type ListRsp = ListData<AiChatT>