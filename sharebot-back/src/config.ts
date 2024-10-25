import { env } from "./env";

export const STAGE = env.STAGE;
export const PORT = STAGE == "prod" ? 6020 : 6021;
export const SOCKET_PORT = STAGE == "prod" ? 6025 : 6026;

