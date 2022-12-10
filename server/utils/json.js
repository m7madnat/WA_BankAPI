import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../db");

export const loadJson = (fileName) => {
  const dataJSON = fs.readFileSync(`${dbPath}/${fileName}.json`, "utf-8");
  return JSON.parse(dataJSON);
};

export const saveJson = (newData, fileName) => {
  const dataJSON = JSON.stringify(newData);
  fs.writeFileSync(`${dbPath}/${fileName}.json`, dataJSON, "utf-8");
  return true;
};

export const isExist = (id, fileName) => {
  const data = loadJson(fileName);
  const isExist = data.find((item) => item.id === id);
  return isExist;
};