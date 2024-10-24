import { server } from "@/system/server";
import * as R from "@/types/Admin.api";
import type { AdminT } from "@/types/Admin";

const root = "/admins";

export async function getMe(): Promise<R.GetMeRsp> {
  const rsp = await server.get(`${root}/me`);
  return rsp.data;
}
