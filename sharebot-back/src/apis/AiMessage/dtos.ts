import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { aiMessageFormSchema, listAiMessageOptionSchema } from "@/models/AiMessage";
// import { } from "@/types/_";


// create
export class CreateAiMessageDto extends createZodDto(z.object({
  form: aiMessageFormSchema
})) {}

// list
export class ListAiMessageDto extends createZodDto(listAiMessageOptionSchema) {}
