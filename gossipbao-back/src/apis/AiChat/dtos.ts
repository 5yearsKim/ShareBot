import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { aiChatFormSchema, listAiChatOptionSchema } from "@/models/AiChat";
// import { } from "@/types/_";


// create
export class CreateAiChatDto extends createZodDto(z.object({
  form: aiChatFormSchema,
})) {}

// list
export class ListAiChatOptionT extends createZodDto(listAiChatOptionSchema) {}
