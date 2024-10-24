import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { aiMessageFormSchema } from "@/models/AiMessage";


// create
export const BotRespondSchema = z.object({
  group: z.object({
    id: z.number().int(),
    name: z.string(),
  }),
  messages: aiMessageFormSchema.array(),
  generatorType: z.enum(["openai", "claude", "gemini"]).nullish(),
});


// botRespond

