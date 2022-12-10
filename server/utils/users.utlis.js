import {
  addUserIdToAccounts,
  createNewAccount,
  deleteUserIdFromAccounts,
  getTotalCash,
} from "./accounts.utlis.js";
import { loadJson, saveJson } from "./json.js";

export const createNewUser = (userId, accountIds) => {
  if (accountIds.length === 0) {
    const newAccount = createNewAccount([userId]);
    accountIds.push(newAccount.id);
  } else {
    addUserIdToAccounts(userId, accountIds);
  }
  const users = loadJson("users");
  const newUser = {
    id: userId,
    accountIds,
    totalCash: getTotalCash(accountIds),
  };
  users.push(newUser);
  saveJson(users, "users");
};

export const deleteUserFromDB = (userId) => {
  const users = loadJson("users");
  const newUsers = users.filter((user) => user.id !== userId);
  const { accountIds } = users.find((user) => user.id === userId);
  deleteUserIdFromAccounts(userId, accountIds);
  saveJson(newUsers, "users");
};

export const updateUsers = () => {
  const users = loadJson("users");
  users.forEach((user) => {
    user.totalCash = getTotalCash(user.accountIds);
  });
  saveJson(users, "users");
};
