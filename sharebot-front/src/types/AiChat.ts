export type AiChatFormT = {
    user_id: number | null;
    title?: (string | null) | undefined;
}

type _AiChatT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    user_id: number | null;
    title?: (string | null) | undefined;
}

export type GetAiChatOptionT = {
    userId?: (number | undefined) | undefined;
    groupId?: (number | undefined) | undefined;
    $lastMessage?: boolean | undefined;
}

export type ListAiChatOptionT = {
    limit?: (number | undefined) | undefined;
    cursor?: (string | undefined) | undefined;
    userId?: ((number | undefined) | undefined) | undefined;
    groupId?: ((number | undefined) | undefined) | undefined;
    $lastMessage?: (boolean | undefined) | undefined;
}


// @type-gen remain
import { AiMessageT } from "./AiMessage";

export interface AiChatT extends _AiChatT {
  last_message?: AiMessageT|null
}