import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { groupFileFormSchema, listGroupFileOptionSchema } from "@/models/GroupFile";
// import { } from "@/types/_";


// list
export class ListGroupFileDto extends createZodDto(listGroupFileOptionSchema) {}

// create
export class CreateGroupFileDto extends createZodDto(z.object({
  form: groupFileFormSchema,
})) {}

// get
