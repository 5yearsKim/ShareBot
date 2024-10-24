import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { accountFormSchema, listAccountOptionSchema } from "@/models/Account";

// create
export class CreateAccountDto extends createZodDto(z.object({
  form: accountFormSchema,
})) {}

// list
export class ListAccountDto extends createZodDto(listAccountOptionSchema) {}