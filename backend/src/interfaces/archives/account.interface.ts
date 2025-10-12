export type StatusAccount = "pending" | "active" | "inactive" | "suspended";

export interface AccountRecord {
  id_account: number;
  email: string;
  username: string;
  status_account: StatusAccount;
  is_banned: boolean;
  is_restricted: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  created_at: Date;
  last_updated: Date;
  last_login_at: Date | null;
  reputation: number;
}

export interface AccountCreate {
  email: string;
  username: string;
  password: string;
  status_account?: StatusAccount;
  is_banned?: boolean;
  is_restricted?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  reputation?: number;
}

export interface AccountUpdate {
  email?: string;
  username?: string;
  password?: string;
  status_account?: StatusAccount;
  is_banned?: boolean;
  is_restricted?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  last_login_at?: Date | null;
  reputation?: number;
}

export interface AccountFilters {
  id_account?: number;
  email?: string;
  username?: string;
  password?: string;
  status_account?: StatusAccount;
  is_banned?: boolean;
  is_restricted?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  min_reputation?: number;
  max_reputation?: number;
}

export interface AccountQuery {
  filters?: AccountFilters;
  limit?: number;
  offset?: number;
  sort_by?: keyof AccountRecord;
  order_by?: "created_at" | "reputation" | "username";
  sort_order?: "ASC" | "DESC";
}

export interface AccountRepository {
  create(
    data: AccountCreate,
    opts?: { transaction?: unknown }
  ): Promise<AccountRecord>;
  findById(id: number): Promise<AccountRecord | null>;
  findOne(query: AccountQuery): Promise<AccountRecord | null>;
  findAll(
    query: AccountQuery
  ): Promise<{ rows: AccountRecord[]; count: number }>;
  update(
    id: number,
    data: AccountUpdate,
    opts?: { transaction?: unknown }
  ): Promise<number>;
  updateAll(
    data: AccountUpdate,
    filters?: AccountFilters,
    opts?: { transaction?: unknown }
  ): Promise<number>;
  deleteById(id: number, opts?: { transaction?: unknown }): Promise<number>;
  deleteAll(
    filters?: AccountFilters,
    opts?: { transaction?: unknown }
  ): Promise<number>;
}
