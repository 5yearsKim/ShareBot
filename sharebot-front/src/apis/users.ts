import { server } from "@/system/server";
import * as R from "@/types/User.api";
import type { UserFormT, ListUserOptionT, GetUserOptionT } from "@/types/User";

const root = "/users";

// export async function get(id: idT, option: GetGroupOptionT = {}): Promise<R.GetGroupRsp> {
//   const params: R.GetGroupRqs = option;
//   const rsp = await server.get(`${root}/${id}`, { params });
//   return rsp.data;
// }

export async function list(listOpt: ListUserOptionT): Promise<R.ListRsp> {
  const params: R.ListRqs = listOpt;
  const rsp = await server.get(`${root}`, { params });
  return rsp.data;
}

export async function access(groupId: idT): Promise<R.AccessRsp> {
  const body: R.AccessRqs = { groupId };
  const rsp = await server.post(`${root}/access`, body);
  return rsp.data;
}

export async function getMe(getOpt: GetUserOptionT = {}): Promise<R.GetMeRsp> {
  const params: R.GetMeRqs = getOpt;
  const rsp = await server.get(`${root}/me`, { params });
  return rsp.data;
}

export async function updateMe(form: Partial<UserFormT>): Promise<R.UpdateMeRsp> {
  const body: R.UpdateMeRqs = { form };
  const rsp = await server.patch(`${root}/me`, body);
  return rsp.data;
}

export async function removeMe(): Promise<R.DeleteMeRsp> {
  const rsp = await server.delete(`${root}/me`);
  return rsp.data;
}

export async function requestJoin(groupId: idT, groupPassword?: string): Promise<R.RequestJoinRsp> {
  const body: R.RequestJoinRqs = { groupId, groupPassword };
  const rsp = await server.post(`${root}/request-join`, body);
  return rsp.data;
}


// export async function checkStatus(groupId: idT): Promise<R.CheckStatusRsp> {
//   const body: R.CheckStatusRqs = { groupId };
//   const rsp = await server.post(`${root}/check-status`, body);
//   return rsp.data;
// }