import {
    updateAccountCash,
    updateAccountCredit,
  } from "../utils/accounts.utlis.js";
  import { isExist, loadJson, saveJson } from "../utils/json.js";
  import { updateUsers } from "../utils/users.utlis.js";
  
  export const getAllAccounts = (req, res) => {
    try {
      const accounts = loadJson("accounts");
      res.status(200).json(accounts);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  
  export const getAccountById = (req, res) => {
    try {
      const { accountId } = req.params;
      if (!isExist(accountId, "accounts")) {
        throw new Error("This account does not exist");
      }
      const accounts = loadJson("accounts");
      const account = accounts.find((account) => account.id === accountId);
      res.status(200).json(account);
    } catch (err) {
      res.status(400).send(err.message);
    }    
  };
  
  export const depositToAccount = (req, res) => {
    try {
      const { accountId, amount } = req.body;
      if (!isExist(accountId, "accounts")) {
        throw new Error("This account does not exist");
      }
      if (typeof amount !== "number") {
        throw new Error("Amount is not a number");
      }
      if (amount < 0) {
        throw new Error("Can deposit only positive numbers");
      }
      updateAccountCash(amount, accountId);
      updateUsers();
      res.status(200).send("The deposit was made successfully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  
  export const withdrawFromAccount = (req, res) => {
    try {
      const { accountId, amount } = req.body;
      if (!isExist(accountId, "accounts")) {
        throw new Error("This account does not exist");
      }
      if (typeof amount !== "number") {
        throw new Error("Amount is not a number");
      }
      if (amount < 0) {
        throw new Error("Can withdraw only positive numbers");
      }
      const accounts = loadJson("accounts");
      const accountIndex = accounts.findIndex(
        (account) => accountId === account.id
      );
      if (accounts[accountIndex].cash + accounts[accountIndex].credit < amount) {
        throw new Error("Not enough cash and credit for this action");
      }
      updateAccountCash(-amount, accountId);
      updateUsers();
      res.status(200).send("The withdraw was made successfully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  
  export const transfer = (req, res) => {
    try {
      const { sender,receiver, amount } = req.body;
      if (!isExist(sender, "accounts") || !isExist(receiver, "accounts")) {
        throw new Error("One or two of the account IDs do not exist");
      }
      if (typeof amount !== "number") {
        throw new Error("Amount is not a number");
      }
      if (amount < 0) {
        throw new Error("Can transfer only positive numbers");
      }
      updateAccountCash(-amount, sender);
      updateAccountCash(amount, receiver);
      updateUsers();
      res.status(200).send("The transfer was made successfully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  
  export const updateCredit = (req, res) => {
    try {
      const { accountId, amountCredit } = req.body;
      if (!isExist(accountId, "accounts")) {
        throw new Error("This account does not exist");
      }
      if (typeof amountCredit !== "number") {
        throw new Error("amountCredit is not a number");
      }
      if (amountCredit < 0) {
        throw new Error("Credit can only get positive numbers");
      }
      updateAccountCredit(accountId, amountCredit);
      res.status(200).send("Credit updated successfully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  