import { server } from "@/system/server";
import * as R from "@/types/GroupAdmin.api";
import { GroupAdminT } from "@/types/GroupAdmin";

const root = "/group-admins";

export async function getMe(groupId: idT): Promise<R.GetMeRsp> {
  const params: R.GetMeRqs = { groupId };
  const rsp = await server.get(`${root}/me`, { params });
  return rsp.data;
}
