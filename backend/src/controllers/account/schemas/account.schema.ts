import { z } from "zod";

export const StatusAccountSchema = z.enum([
  "pending",
  "active",
  "suspended",
  "deleted",
]);

export const CreateAccountSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  status_account: z
    .enum(["pending", "active", "suspended", "deleted"])
    .default("pending"),
  is_banned: z.boolean().default(false),
  is_restricted: z.boolean().default(false),
  is_email_verified: z.boolean().default(false),
  is_phone_verified: z.boolean().default(false),
  reputation: z.number().default(0),
});

export const UpdateAccountSchema = CreateAccountSchema.partial().extend({
  last_login_at: z.coerce.date().nullable().optional(),
});

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const ListQuerySchema = z.object({
  id_account: z.coerce.number().int().positive().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  status_account: StatusAccountSchema.optional(),
  is_banned: z.coerce.boolean().optional(),
  is_restricted: z.coerce.boolean().optional(),
  is_email_verified: z.coerce.boolean().optional(),
  is_phone_verified: z.coerce.boolean().optional(),
  min_reputation: z.coerce.number().int().min(0).optional(),
  max_reputation: z.coerce.number().int().min(0).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  sort_by: z
    .enum(["id_account", "username", "reputation", "created_at", "last_updated"])
    .optional(),
  sort_order: z.enum(["ASC", "DESC"]).default("DESC"),
});
