export type GroupTagFormT = {
    label: string;
    rank?: (number | null) | undefined;
}

export type GroupTagT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    label: string;
    rank?: (number | null) | undefined;
}

export type GetGroupTagOptionT = {
    userId?: number | undefined;
    groupId?: number | undefined;
}

export type ListGroupTagOptionT = {
    limit?: (number | undefined) | undefined;
    cursor?: (string | undefined) | undefined;
    userId?: (number | undefined) | undefined;
    groupId?: (number | undefined) | undefined;
}
