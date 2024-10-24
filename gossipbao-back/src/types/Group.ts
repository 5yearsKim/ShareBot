export type GroupProtectionT = "public" | "protected" | "private"

export type GroupFormT = {
    key: string;
    name: string;
    short_name?: (string | null) | undefined;
    avatar_path?: (string | null) | undefined;
    description?: (string | null) | undefined;
    protection: "public" | "protected" | "private";
    theme_color?: (string | null) | undefined;
    deleted_at?: (Date | null) | undefined;
    use_point?: boolean | undefined;
    allow_create_board?: boolean | undefined;
    locale?: (string | null) | undefined;
}

type _GroupT = {
    id: number;
    created_at: Date;
    updated_at?: Date | undefined;
    key: string;
    name: string;
    short_name?: (string | null) | undefined;
    avatar_path?: (string | null) | undefined;
    description?: (string | null) | undefined;
    protection: "public" | "protected" | "private";
    theme_color?: (string | null) | undefined;
    deleted_at?: (Date | null) | undefined;
    use_point?: boolean | undefined;
    allow_create_board?: boolean | undefined;
    locale?: (string | null) | undefined;
}

export type GetGroupOptionT = {
    userId?: (number | undefined) | undefined;
    groupId?: (number | undefined) | undefined;
    accountId?: number | undefined;
    $admin?: boolean | undefined;
    $tags?: boolean | undefined;
    $secret?: boolean | undefined;
}

export type ListGroupOptionT = {
    limit?: (number | undefined) | undefined;
    cursor?: (string | undefined) | undefined;
    userId?: ((number | undefined) | undefined) | undefined;
    groupId?: ((number | undefined) | undefined) | undefined;
    accountId?: (number | undefined) | undefined;
    $admin?: (boolean | undefined) | undefined;
    $tags?: (boolean | undefined) | undefined;
    $secret?: (boolean | undefined) | undefined;
    protection?: ("public" | "protected" | "private") | undefined;
    joined?: ("except" | "only") | undefined;
    admining?: ("except" | "only") | undefined;
    sort?: ("recent" | "old") | undefined;
    search?: string | undefined;
    tagId?: number | undefined;
}


// @type-gen remain
import { GroupTagT } from "./GroupTag";
import { GroupSecretT } from "./GroupSecret";

export interface GroupT extends _GroupT {
  tags?: GroupTagT[]
  secret?: GroupSecretT|null
}