import { RESOURCE_URL } from "@/config";

type ImageSizeT = "xxs"| "xs" | "sm" | "md" | "lg";


export function buildImgUrl(
  host: string|null,
  path: string,
  option: {size?: ImageSizeT} = {},
): string {
  if (host !== null) {
    return new URL(path, host).toString();
  }
  let url = new URL(path, RESOURCE_URL).toString();
  if (option.size) {
    url = `${url}?w=${getResizeW(option.size)}`;
  }
  return url;
}


function getResizeW(size: ImageSizeT): number{
  switch (size) {
  case "xxs":
    return 90;
  case "xs":
    return 180;
  case "sm":
    return 360;
  case "md":
    return 720;
  case "lg":
    return 1440;
  default:
    return 720;
  }
}