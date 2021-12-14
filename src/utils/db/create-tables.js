import fs from "fs-extra";
import path from "path";
import pool from "./connect.js";
const { readJSON} = fs


const createTables = async () => {
  try {
    // Reading sql file content
    const filePath = path.join(process.cwd(), "src/utils/db/tables.sql");
    const fileContentAsString = () => readJSON(filePath)
    // executing the query in postgres
    pool.query(fileContentAsString);
    console.log("✅ Default tables are created");
  } catch (error) {
    console.log("❌ Error! tables are not created", error);
  }
};

(async () => {
  await createTables();
})();