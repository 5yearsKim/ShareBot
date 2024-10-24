export type AiMessageFormT = {
    chat_id: number;
    type: "bot" | "user";
    sender_id: number | null;
    message?: (string | null) | undefined;
}

type _AiMessageT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    chat_id: number;
    type: "bot" | "user";
    sender_id: number | null;
    message?: (string | null) | undefined;
}

export type GetAiMessageOptionT = {
    userId?: (number | undefined) | undefined;
    groupId?: (number | undefined) | undefined;
    $sender?: boolean | undefined;
}

export type ListAiMessageOptionT = {
    limit?: (number | undefined) | undefined;
    cursor?: (string | undefined) | undefined;
    userId?: ((number | undefined) | undefined) | undefined;
    groupId?: ((number | undefined) | undefined) | undefined;
    $sender?: (boolean | undefined) | undefined;
    chatId?: number | undefined;
}


// @type-gen remain
export interface AiMessageT extends _AiMessageT {}