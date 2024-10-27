import { server } from "@/system/server";
import * as R from "@/types/Group.api";
import { GetGroupOptionT, ListGroupOptionT, GroupFormT } from "@/types/Group";

const root = "/groups";

export async function create(form: GroupFormT): Promise<R.CreateRsp> {
  const body: R.CreateRqs = { form };
  const rsp = await server.post(`${root}`, body);
  return rsp.data;
}

export async function get(id: idT, option: GetGroupOptionT = {}): Promise<R.GetRsp> {
  const params: R.GetRqs = option;
  const rsp = await server.get(`${root}/${id}`, { params });
  return rsp.data;
}

export async function getByKey(key: string, getOpt: GetGroupOptionT = {}): Promise<R.GetByKeyRsp> {
  const params: R.GetByKeyRqs = getOpt;
  const rsp = await server.get(`${root}/key/${key}`, { params });
  return rsp.data;
}

export async function update(id: idT, form: Partial<GroupFormT>): Promise<R.UpdateRsp> {
  const body: R.UpdateRqs = { form };
  const rsp = await server.patch(`${root}/${id}`, body);
  return rsp.data;
}

export async function list(option: ListGroupOptionT): Promise<R.ListRsp> {
  const params: R.ListRqs = option;
  const rsp = await server.get(`${root}`, { params });
  return rsp.data;
}

export async function uploadThumbnail(image: File): Promise<R.UploadThumbnailRsp> {
  const formData = new FormData();
  formData.append("image", image);
  const rsp = await server.post(`${root}/thumbnail`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return rsp.data;
}

export async function deleteThumbnail(key: string): Promise<R.DeleteThumbnailRsp> {
  const body: R.DeleteThumbnailRqs = { key };
  const rsp = await server.delete(`${root}/thumbnail`, { data: body });
  return rsp.data;
}


export async function uploadFile(file: File): Promise<R.UploadFileRsp> {
  const formData = new FormData();
  formData.append("file", file);
  const rsp = await server.post(`${root}/file`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return rsp.data;
}