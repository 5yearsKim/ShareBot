import { server } from "@/system/server";
import * as R from "@/types/GroupFile.api";
import { GetGroupFileOptionT, ListGroupFileOptionT, GroupFileFormT } from "@/types/GroupFile";

const root = "/group-files";

export async function create(form: GroupFileFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}`, body);
  return rsp.data;
}


export async function list(listOpt: ListGroupFileOptionT): Promise<R.ListRsp> {
  const params: R.ListRqs = listOpt;
  const rsp = await server.get(`${root}`, { params });
  return rsp.data;
}


export async function remove(id: idT): Promise<R.DeleteRsp> {
  const rsp = await server.delete(`${root}/${id}`);
  return rsp.data;
}