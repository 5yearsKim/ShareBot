import { server } from "@/system/server";
import * as R from "@/types/GroupSecret.api";
import { GroupSecretT, GroupSecretFormT } from "@/types/GroupSecret";

const root = "/group-secrets";

export async function getByGroup(groupId: idT): Promise<R.GetByGroupRsp> {
  // const params: R.GetByGroupRqs = { groupId };
  const rsp = await server.get(`${root}/by-group/${groupId}`, { });
  return rsp.data;
}

export async function create(form: GroupSecretFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}`, body);
  return rsp.data;
}

export async function deleteByGroup(groupId: idT): Promise<R.RemoveByGroupRsp> {
  const rsp = await server.delete(`${root}/by-group/${groupId}`);
  return rsp.data;
}
