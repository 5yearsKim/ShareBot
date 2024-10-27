export type GroupFileFormT = {
    user_id: number;
    group_id: number;
    path: string;
    mime_type?: (string | null) | undefined;
    name: string;
    content?: (string | null) | undefined;
}

export type GroupFileT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    user_id: number;
    group_id: number;
    path: string;
    mime_type?: (string | null) | undefined;
    name: string;
    content?: (string | null) | undefined;
}

export type GetGroupFileOptionT = {
    userId?: number | undefined;
    groupId?: number | undefined;
}

export type ListGroupFileOptionT = {
    limit?: number | undefined;
    cursor?: string | undefined;
    userId?: number | undefined;
    groupId?: number | undefined;
}
