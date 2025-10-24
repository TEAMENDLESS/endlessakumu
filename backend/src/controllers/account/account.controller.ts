import type { Request, Response } from "express";
import { HTTP_STATUS, MESSAGES } from "../../constants/index.js";
import accountService from "../../services/account/account.service.js";
import {
  CreateAccountSchema,
  UpdateAccountSchema,
  IdParamSchema,
  ListQuerySchema,
} from "./schemas/account.schema.js";

export const create = async (req: Request, res: Response) => {
  try {
    const parsed = CreateAccountSchema.safeParse(req.body);
    if (!parsed.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.SERVER.VALIDATION_ERROR, details: parsed.error.flatten() });
    const data = await accountService.createAccount(parsed.data);
    return res.status(HTTP_STATUS.CREATED).json({ data, message: MESSAGES.USER.CREATED });
  } catch (e: any) {
    if (e instanceof Error && (e.message === MESSAGES.USER.DUPLICATE_EMAIL || e.message === MESSAGES.USER.DUPLICATE_USERNAME)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: e.message });
    }
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: MESSAGES.SERVER.ERROR });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const parsed = IdParamSchema.safeParse(req.params);
    if (!parsed.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.SERVER.VALIDATION_ERROR, details: parsed.error.flatten() });
    const data = await accountService.getAccountById(parsed.data.id);
    if (!data) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: MESSAGES.USER.NOT_FOUND });
    return res.status(HTTP_STATUS.OK).json({ data });
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: MESSAGES.SERVER.ERROR });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const parsed = ListQuerySchema.safeParse(req.query);
    if (!parsed.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.SERVER.VALIDATION_ERROR, details: parsed.error.flatten() });
    const data = await accountService.listAccounts(parsed.data);
    return res.status(HTTP_STATUS.OK).json({ data });
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: MESSAGES.SERVER.ERROR });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const idParsed = IdParamSchema.safeParse(req.params);
    if (!idParsed.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.SERVER.VALIDATION_ERROR, details: idParsed.error.flatten() });
    const bodyParsed = UpdateAccountSchema.safeParse(req.body);
    if (!bodyParsed.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.SERVER.VALIDATION_ERROR, details: bodyParsed.error.flatten() });
    const updated = await accountService.updateAccountById(idParsed.data.id, bodyParsed.data);
    if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: MESSAGES.USER.NOT_FOUND });
    return res.status(HTTP_STATUS.OK).json({ data: updated, message: MESSAGES.USER.UPDATED });
  } catch (e: any) {
    if (e instanceof Error && (e.message === MESSAGES.USER.DUPLICATE_EMAIL || e.message === MESSAGES.USER.DUPLICATE_USERNAME)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: e.message });
    }
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: MESSAGES.SERVER.ERROR });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const parsed = IdParamSchema.safeParse(req.params);
    if (!parsed.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.SERVER.VALIDATION_ERROR, details: parsed.error.flatten() });
    const ok = await accountService.deleteAccountById(parsed.data.id);
    if (!ok) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: MESSAGES.USER.NOT_FOUND });
    return res.status(HTTP_STATUS.OK).json({ data: { id: parsed.data.id }, message: MESSAGES.USER.DELETED });
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: MESSAGES.SERVER.ERROR });
  }
};

export default { create, getById, list, update, remove };
