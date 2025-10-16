import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/index.js";
import { MESSAGES } from "../../constants/archives/messages.js";
import accountService from "../../services/account/account.service.js";
import {
  CreateAccountSchema,
  UpdateAccountSchema,
  IdParamSchema,
  ListQuerySchema,
} from "./schemas/account.schema.js";
import type {
  AccountFilters,
  AccountQuery,
  AccountUpdate,
} from "../../interfaces/archives/account.interface.js";

export const create = async (req: Request, res: Response) => {
  const parsed = CreateAccountSchema.safeParse(req.body);
  if (!parsed.success)
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: parsed.error.flatten() });
  const data = await accountService.createAccount(parsed.data);
  return res.status(HTTP_STATUS.CREATED).json({ data });
};

export const getById = async (req: Request, res: Response) => {
  const parsed = IdParamSchema.safeParse(req.params);
  if (!parsed.success)
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: parsed.error.flatten() });
  const data = await accountService.getAccountById(parsed.data.id);
  if (!data)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: MESSAGES.USER.NOT_FOUND });
  return res.status(HTTP_STATUS.OK).json({ data });
};

export const list = async (req: Request, res: Response) => {
  const parsed = ListQuerySchema.safeParse(req.query);
  if (!parsed.success)
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: parsed.error.flatten() });

  const q = parsed.data;
  const filters: AccountFilters = {};
  if (q.id_account !== undefined) filters.id_account = q.id_account;
  if (q.email !== undefined) filters.email = q.email;
  if (q.username !== undefined) filters.username = q.username;
  if (q.status_account !== undefined) filters.status_account = q.status_account;
  if (q.is_banned !== undefined) filters.is_banned = q.is_banned;
  if (q.is_restricted !== undefined) filters.is_restricted = q.is_restricted;
  if (q.is_email_verified !== undefined)
    filters.is_email_verified = q.is_email_verified;
  if (q.is_phone_verified !== undefined)
    filters.is_phone_verified = q.is_phone_verified;
  if (q.min_reputation !== undefined) filters.min_reputation = q.min_reputation;
  if (q.max_reputation !== undefined) filters.max_reputation = q.max_reputation;

  const query: AccountQuery = {
    filters,
    limit: q.limit,
    offset: q.offset,
    ...(q.sort_by !== undefined ? { sort_by: q.sort_by } : {}),
    ...(q.sort_order !== undefined ? { sort_order: q.sort_order } : {}),
  };

  const data = await accountService.listAccounts(query);
  return res.status(HTTP_STATUS.OK).json({ data });
};

export const update = async (req: Request, res: Response) => {
  const idParsed = IdParamSchema.safeParse(req.params);
  if (!idParsed.success)
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: idParsed.error.flatten() });

  const bodyParsed = UpdateAccountSchema.safeParse(req.body);
  if (!bodyParsed.success)
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: bodyParsed.error.flatten() });

  const clean = Object.fromEntries(
    Object.entries(bodyParsed.data).filter(([, v]) => v !== undefined)
  ) as AccountUpdate;

  const affected = await accountService.updateAccountById(
    idParsed.data.id,
    clean
  );
  if (!affected)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: MESSAGES.USER.NOT_FOUND });

  const data = await accountService.getAccountById(idParsed.data.id);
  return res.status(HTTP_STATUS.OK).json({ data });
};

export const remove = async (req: Request, res: Response) => {
  const parsed = IdParamSchema.safeParse(req.params);
  if (!parsed.success)
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: parsed.error.flatten() });
  const affected = await accountService.deleteAccountById(parsed.data.id);
  if (!affected)
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ error: MESSAGES.USER.NOT_FOUND });
  return res.status(HTTP_STATUS.OK).json({ data: { id: parsed.data.id } });
};
