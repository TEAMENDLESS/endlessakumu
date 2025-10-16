import { accountRepository } from "../../repositories/index.js";
import type {
  AccountCreate,
  AccountFilters,
  AccountQuery,
  AccountUpdate,
} from "../../interfaces/index.js";

const createAccount = (data: AccountCreate) => accountRepository.create(data);
const getAccountById = (id: number) => accountRepository.findById(id);
const listAccounts = (query: AccountQuery) => accountRepository.findAll(query);
const findOneAccount = (query: AccountQuery) =>
  accountRepository.findOne(query);
const updateAccountById = (id: number, data: AccountUpdate) =>
  accountRepository.update(id, data);
const updateAccounts = (data: AccountUpdate, filters?: AccountFilters) =>
  accountRepository.updateAll(data, filters);
const deleteAccountById = (id: number) => accountRepository.deleteById(id);
const deleteAccounts = (filters?: AccountFilters) =>
  accountRepository.deleteAll(filters);

export default {
  createAccount,
  getAccountById,
  listAccounts,
  findOneAccount,
  updateAccountById,
  updateAccounts,
  deleteAccountById,
  deleteAccounts,
};
