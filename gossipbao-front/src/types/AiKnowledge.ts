export type AiKnowledgeFormT = {
    group_id: number;
    user_id: number | null;
    content: string;
    applied_info: {
        applied_at: string;
        ids: string[];
    } | null;
}

export type AiKnowledgeT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    group_id: number;
    user_id: number | null;
    content: string;
    applied_info: {
        applied_at: string;
        ids: string[];
    } | null;
}

export type GetAiKnowledgeOptionT = {
    userId?: (number | undefined) | undefined;
    groupId?: (number | undefined) | undefined;
}

export type ListAiKnowledgeOptionT = {
    limit?: (number | undefined) | undefined;
    cursor?: (string | undefined) | undefined;
    userId?: number | undefined;
    groupId?: ((number | undefined) | undefined) | undefined;
}
