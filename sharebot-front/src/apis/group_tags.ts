import { server } from "@/system/server";
import * as R from "@/types/GroupTag.api";
import { GetGroupTagOptionT, ListGroupTagOptionT, GroupTagT, GroupTagFormT } from "@/types/GroupTag";

const root = "/group-tags";

export async function create(form: GroupTagFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}`, body);
  return rsp.data;
}

export async function get(id: idT, getOpt: GetGroupTagOptionT = {}): Promise<R.GetRsp> {
  const params: R.GetRqs = getOpt;
  const rsp = await server.get(`${root}/${id}`, { params });
  return rsp.data;
}

export async function list(listOpt: ListGroupTagOptionT): Promise<R.ListRsp> {
  const params: R.ListRqs = listOpt;
  const rsp = await server.get(`${root}`, { params });
  return rsp.data;
}


export async function update(id: idT, form: Partial<GroupTagFormT>): Promise<R.UpdateRsp> {
  const body: R.UpdateRqs = { form };
  const rsp = await server.patch(`${root}/${id}`, body);
  return rsp.data;
}

export async function remove(id: idT): Promise<R.DeleteRsp> {
  const rsp = await server.delete(`${root}/${id}`);
  return rsp.data;
}
