import { AiKnowledgeFormT, AiKnowledgeT, ListAiKnowledgeOptionT } from "./AiKnowledge";

// (POST) /
export type CreateRqs = {
  form: AiKnowledgeFormT
}
export type CreateRsp = AiKnowledgeT

// (GET) /
export type ListRqs = ListAiKnowledgeOptionT
export type ListRsp = ListData<AiKnowledgeT>

// (DELETE) /:id
export type DeleteRqs = null
export type DeleteRsp = AiKnowledgeT
