import { userM } from "@/models/User";
import { adminM } from "@/models/Admin";
import type { AdminT } from "@/types";
import * as err from "@/errors";


export async function checkAdmin(accountId: number): Promise<AdminT> {
  const admin = await adminM.findOne({ account_id: accountId });
  if (!admin) {
    throw new err.ForbiddenE("user need to be admin");
  }
  return admin;
}