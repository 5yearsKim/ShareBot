import { env } from "./env";

export const STAGE = env.STAGE;
export const PORT = STAGE == "prod" ? 5010 : 4010;
export const SOCKET_PORT = STAGE == "prod" ? 5510 : 4510;

