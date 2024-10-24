import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { GroupSecretFormSchema } from "@/models/GroupSecret";
// import { } from "@/types/_";


// create
export class CreateGroupSecretDto extends createZodDto(z.object({
  form: GroupSecretFormSchema,
})) {}