import { server } from "@/system/server";
import * as R from "@/types/XGroupGroupTag.api";
import { XGroupGroupTagFormT, XGroupGroupTagT } from "@/types/XGroupGroupTag";

const root = "/x-group-group-tag";

export async function create(form: XGroupGroupTagFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}`, body);
  return rsp.data;
}

export async function resetByGroup(groupId: idT): Promise<R.ResetByGroupRsp> {
  const body: R.ResetByGroupRqs = { groupId };
  const rsp = await server.post(`${root}/reset-by-group`, body);
  return rsp.data;
}