import {
  Op,
  type Transaction,
  type WhereOptions,
  type FindOptions,
} from "sequelize";
import { Account } from "../../models/archives/tables/account.model.js";
import type {
  AccountCreate,
  AccountUpdate,
  AccountFilters,
  AccountQuery,
  AccountRecord,
} from "../../interfaces/archives/account.interface.js";

const toRecord = (row: Account): AccountRecord =>
  row.get({ plain: true }) as unknown as AccountRecord;

const buildWhere = (f?: AccountFilters): WhereOptions | undefined => {
  if (!f) return undefined;
  const where: WhereOptions = {};
  if (f.id_account !== undefined) where["id_account"] = f.id_account;
  if (f.email !== undefined) where["email"] = f.email;
  if (f.username !== undefined) where["username"] = f.username;
  if (f.password !== undefined) where["password"] = f.password;
  if (f.status_account !== undefined)
    where["status_account"] = f.status_account;
  if (f.is_banned !== undefined) where["is_banned"] = f.is_banned;
  if (f.is_restricted !== undefined) where["is_restricted"] = f.is_restricted;
  if (f.is_email_verified !== undefined)
    where["is_email_verified"] = f.is_email_verified;
  if (f.is_phone_verified !== undefined)
    where["is_phone_verified"] = f.is_phone_verified;
  if (f.min_reputation !== undefined || f.max_reputation !== undefined) {
    where["reputation"] = {
      ...(f.min_reputation !== undefined ? { [Op.gte]: f.min_reputation } : {}),
      ...(f.max_reputation !== undefined ? { [Op.lte]: f.max_reputation } : {}),
    };
  }
  return where;
};

const stripUndefined = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;

export const accountRepository = {
  async create(
    data: AccountCreate,
    opts?: { transaction?: Transaction | null }
  ): Promise<AccountRecord> {
    const row = await Account.create(data as any, {
      transaction: opts?.transaction ?? null,
    });
    return toRecord(row);
  },

  async findById(id: number): Promise<AccountRecord | null> {
    const row = await Account.findByPk(id);
    return row ? toRecord(row) : null;
  },

  async findOne(q: AccountQuery): Promise<AccountRecord | null> {
    const options: FindOptions = {};
    const where = buildWhere(q.filters);
    if (where) options.where = where;
    const row = await Account.findOne(options);
    return row ? toRecord(row) : null;
  },

  async findAll(q: AccountQuery) {
    const options: FindOptions = {};
    const where = buildWhere(q.filters);
    if (where) options.where = where;
    if (q.limit !== undefined) options.limit = q.limit;
    if (q.offset !== undefined) options.offset = q.offset;
    if (q.sort_by) options.order = [[q.sort_by, q.sort_order ?? "DESC"]];
    const { rows, count } = await Account.findAndCountAll(options);
    return { rows: rows.map(toRecord), count };
  },

  async update(
    id: number,
    data: AccountUpdate,
    opts?: { transaction?: Transaction | null }
  ) {
    const clean = stripUndefined(data);
    const [affected] = await Account.update(clean, {
      where: { id_account: id },
      transaction: opts?.transaction ?? null,
    });
    return affected;
  },

  async updateAll(
    data: AccountUpdate,
    filters?: AccountFilters,
    opts?: { transaction?: Transaction | null }
  ) {
    const clean = stripUndefined(data);
    const where = buildWhere(filters) ?? {};
    const [affected] = await Account.update(clean, {
      where,
      transaction: opts?.transaction ?? null,
    });
    return affected;
  },

  async deleteById(id: number, opts?: { transaction?: Transaction | null }) {
    return Account.destroy({
      where: { id_account: id },
      transaction: opts?.transaction ?? null,
    });
  },

  async deleteAll(
    filters?: AccountFilters,
    opts?: { transaction?: Transaction | null }
  ) {
    const where = buildWhere(filters) ?? {};
    return Account.destroy({
      where,
      transaction: opts?.transaction ?? null,
    });
  },
};
