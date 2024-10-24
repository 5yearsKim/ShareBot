export type GroupAdminFormT = {
    user_id: number;
    group_id: number;
    is_super: boolean | null;
}

export type GroupAdminT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    user_id: number;
    group_id: number;
    is_super: boolean | null;
}

export type GetGroupAdminOptionT = {
    userId?: number | undefined;
    groupId?: number | undefined;
}

export type ListGroupAdminOptionT = {
    limit?: (number | undefined) | undefined;
    cursor?: (string | undefined) | undefined;
    userId?: (number | undefined) | undefined;
    groupId?: (number | undefined) | undefined;
}
