export type InsertFormT = {}

export type BaseModelT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
}

export type GetOptionT = {
    userId?: number | undefined;
    groupId?: number | undefined;
}

export type ListOptionT = {
    limit?: number | undefined;
    cursor?: string | undefined;
}

export type CensorFilterT = "approved" | "trashed" | "exceptTrashed" | "exceptProcessed"

export type ReportFilterT = "all" | "resolved" | "ignored" | "unprocessed"
