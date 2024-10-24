import { AiMessageFormT, AiMessageT, ListAiMessageOptionT } from "./AiMessage";

// (POST) /
export type CreateRqs = {
  form: AiMessageFormT
};
export type CreateRsp = AiMessageT

// (Get) /
export type ListRqs = ListAiMessageOptionT;
export type ListRsp = ListData<AiMessageT>