import { Op } from "sequelize";
import { Account } from "../../models/archives/tables/account.model.js";
import { MESSAGES } from "../../constants/index.js";

const toPlain = (row: Account) => row.get({ plain: true });

export async function createAccount(input: any) {
  const email = String(input.email).trim().toLowerCase();
  const username = String(input.username).trim();
  const byEmail = await Account.findOne({ where: { email } });
  if (byEmail) throw new Error(MESSAGES.USER.DUPLICATE_EMAIL);
  const byUser = await Account.findOne({ where: { username } });
  if (byUser) throw new Error(MESSAGES.USER.DUPLICATE_USERNAME);
  const created = await Account.create({ ...input, email, username } as any);
  return toPlain(created);
}

export async function getAccountById(id: number) {
  const row = await Account.findByPk(id);
  return row ? toPlain(row) : null;
}

export async function listAccounts(q: any) {
  const where: any = {};
  if (q.id_account !== undefined) where.id_account = q.id_account;
  if (q.email !== undefined) where.email = q.email;
  if (q.username !== undefined) where.username = q.username;
  if (q.status_account !== undefined) where.status_account = q.status_account;
  if (q.is_banned !== undefined) where.is_banned = q.is_banned;
  if (q.is_restricted !== undefined) where.is_restricted = q.is_restricted;
  if (q.is_email_verified !== undefined) where.is_email_verified = q.is_email_verified;
  if (q.is_phone_verified !== undefined) where.is_phone_verified = q.is_phone_verified;
  if (q.min_reputation !== undefined || q.max_reputation !== undefined) {
    where.reputation = {
      ...(q.min_reputation !== undefined ? { [Op.gte]: q.min_reputation } : {}),
      ...(q.max_reputation !== undefined ? { [Op.lte]: q.max_reputation } : {}),
    };
  }
  const order = q.sort_by ? ([[q.sort_by, q.sort_order ?? "DESC"]] as any) : undefined;
  const { rows, count } = await Account.findAndCountAll({
    where: Object.keys(where).length ? where : undefined,
    limit: q.limit,
    offset: q.offset,
    order,
  });
  return { items: rows.map(toPlain), total: count };
}

const stripUndefined = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

export async function updateAccountById(id: number, changes: any) {
  const row = await Account.findByPk(id);
  if (!row) return null;

  const clean = stripUndefined(changes);

  if ("email" in clean && clean.email != null) {
    const newEmail = String(clean.email).trim().toLowerCase();
    if (newEmail !== row.email) {
      const exists = await Account.findOne({
        where: { email: newEmail, id_account: { [Op.ne]: id } },
      });
      if (exists) throw new Error(MESSAGES.USER.DUPLICATE_EMAIL);
    }
    clean.email = newEmail;
  }

  if ("username" in clean && clean.username != null) {
    const newUsername = String(clean.username).trim();
    if (newUsername !== row.username) {
      const existsU = await Account.findOne({
        where: { username: newUsername, id_account: { [Op.ne]: id } },
      });
      if (existsU) throw new Error(MESSAGES.USER.DUPLICATE_USERNAME);
    }
    clean.username = newUsername;
  }

  row.set(clean);
  await row.save();
  return toPlain(row);
}

export async function deleteAccountById(id: number) {
  const n = await Account.destroy({ where: { id_account: id } });
  return n > 0;
}

export default {
  createAccount,
  getAccountById,
  listAccounts,
  updateAccountById,
  deleteAccountById,
};
