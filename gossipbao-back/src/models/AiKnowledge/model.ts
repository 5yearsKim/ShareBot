import { DataModel } from "@/utils/orm";
import type { AiKnowledgeFormT, AiKnowledgeT } from "@/types/AiKnowledge";


const table = "ai_knowledges";
export const aiKnowledgeM = new DataModel<AiKnowledgeFormT, AiKnowledgeT>(table);


