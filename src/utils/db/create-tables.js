import fs from "fs-extra";
import path from "path";
import pool from "./connect.js";
const { readJSON} = fs


const createTables = async () => {
  try {
    const tablesFilePath = path.join(process.cwd(), "src/utils/db/tables.sql");
    const contentAsBuffer = await fs.readFile(tablesFilePath);
    const tablesQuery = contentAsBuffer.toString();
    await pool.query(tablesQuery)
    console.log("✅ Default tables are created");
  } catch (error) {
    console.log( error);
  }
};



(async () => {
  await createTables();
})();