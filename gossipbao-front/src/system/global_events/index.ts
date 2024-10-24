import { GlobalEvent } from "./global_event";
import type { AiChatT } from "@/types";

export const setMainAiChatEv = new GlobalEvent<AiChatT>();

// // sockets
// import {
//   ReceiveMessageArgT,
//   Room$GetClientNumArgT,
//   Room$ReceiveMessageArgT,
//   Room$UpdateArgT,
// } from "@/types/Chat.socket";

