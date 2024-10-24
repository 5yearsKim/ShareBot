import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { aiKnowledgeFormSchema, listAiKnowledgeOptionSchema } from "@/models/AiKnowledge/schema";
// import { } from "@/types/_";


// create
export class CreateAiKnowledgeDto extends createZodDto(z.object({
  form: aiKnowledgeFormSchema,
})) {}

// list
export class ListAiKnowledgeDto extends createZodDto(listAiKnowledgeOptionSchema) {}
