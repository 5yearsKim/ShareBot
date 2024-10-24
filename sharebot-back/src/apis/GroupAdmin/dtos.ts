import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
// import { } from "@/types/_";


// create


// getMe
export class GetMeGroupAdminDto extends createZodDto(z.object({
  groupId: z.coerce.number().int()
})) {}