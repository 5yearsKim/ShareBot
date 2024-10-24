export type XGroupGroupTagFormT = {
    tag_id: number;
    group_id: number;
    rank?: (number | null) | undefined;
}

export type XGroupGroupTagT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    tag_id: number;
    group_id: number;
    rank?: (number | null) | undefined;
}
