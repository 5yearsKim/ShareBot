
// const fromLocal = false;
const fromLocal = (process.env.NEXT_PUBLIC_FROM_LOCAL ?? "false") == "true";
export const STAGE: string = process.env.NEXT_PUBLIC_STAGE ?? "dev";


export const [API_URL, SOCKET_URL] = ((): [string, string] => {
  if ((STAGE as any) == "prod") {
    return ["https://gossip-apis.textrum.kr", ""];
  } else {
    // dev
    if (fromLocal) {
      return ["http://localhost:6021", ""];
    } else {
      return ["http://thisis.wrong.address", ""];
    }
  }
})();

export const FRONT_URL = "gossipbao.com";

export const RESOURCE_URL = "https://resources.nonimos.com";

export const OAUTH_GOOGLE_ID =
  STAGE == "prod"
    ? "437876901404-r55qjole483bhvkmr3rqg00ce2qfgtck.apps.googleusercontent.com"
    : "127223269060-dtagat9oh7go8ieg0j0aj7289mdqe25p.apps.googleusercontent.com";


export const BOT_INFO = {
  thumbnail: "/images/panda.png",
  name: "가십바오",
  id: "gossip_bao",
};
