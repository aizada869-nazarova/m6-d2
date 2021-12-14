import pg from "pg";

const { Pool } = pg;

const pool = new Pool();

export const testDbConnection = async () => {
  try {
    // a test query to check if db connection is successfull
    await pool.query("SELECT NOW()");
    console.log("✅ Database connection is successful");
  } catch (error) {
    console.log("❌ Query failed", error);
  }
};

export default pool;