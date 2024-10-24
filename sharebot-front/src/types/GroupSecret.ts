export type GroupSecretFormT = {
    group_id: number;
    hint?: (string | null) | undefined;
    password: string;
}

export type GroupSecretT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    group_id: number;
    hint?: (string | null) | undefined;
    password: string;
}
