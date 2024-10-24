import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { xGroupGroupTagFormSchema } from "@/models/XGroupGroupTag";
// import { } from "@/types/_";


// create
export class CreateXGroupGroupTagDto extends createZodDto(z.object({
  form: xGroupGroupTagFormSchema,
})) {}

// resetByGroup
export class ResetByGroupDto extends createZodDto(z.object({
  groupId: z.number().int(),
})) {}