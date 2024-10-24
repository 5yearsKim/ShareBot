import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { groupTagFormSchema, getGroupTagOptionSchema, listGroupTagOptionSchema } from "@/models/GroupTag";
// import { } from "@/types/_";


// get
export class GetGroupTagDto extends createZodDto(getGroupTagOptionSchema) {}

// create
export class CreateGroupTagDto extends createZodDto(z.object({
  form: groupTagFormSchema,
})) {}

// update
export class UpdateGroupTagDto extends createZodDto(z.object({
  form: groupTagFormSchema.partial()
})) {}

// delete
// no dto

// list
export class ListGroupTagDto extends createZodDto(listGroupTagOptionSchema) {}

// rerank
export class RerankGroupTagDto extends createZodDto(z.object({
  tagIds: z.number().int().array()
})) {}
