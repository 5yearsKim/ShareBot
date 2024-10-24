export type AdminFormT = {
    account_id: number;
    is_super: boolean;
}

export type AdminT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    account_id: number;
    is_super: boolean;
}

export type GetAdminOptionT = {
    userId?: number | undefined;
    groupId?: number | undefined;
}

export type ListAdminOptionT = {
    limit?: number | undefined;
    cursor?: string | undefined;
    userId?: number | undefined;
    groupId?: number | undefined;
}
