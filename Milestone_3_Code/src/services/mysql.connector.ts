import mysql, { Pool } from "mysql2/promise";

let pool: Pool | null = null;

export const initializeMySqlConnector = async () => {
  try {
    pool = mysql.createPool({
      connectionLimit: Number(process.env.MY_SQL_DB_CONNECTION_LIMIT || 10),
      port: Number(process.env.MY_SQL_DB_PORT || 3306),
      host: process.env.MY_SQL_DB_HOST || "127.0.0.1",
      user: process.env.MY_SQL_DB_USER,
      password: process.env.MY_SQL_DB_PASSWORD,
      database: process.env.MY_SQL_DB_DATABASE,
      waitForConnections: true,
      queueLimit: 0,
    });


    const connection = await pool.getConnection();
    console.log("✅ MySQL connection established");
    console.log(
      "process.env.MY_SQL_DB_DATABASE",
      process.env.MY_SQL_DB_DATABASE,
    );
    connection.release();
  } catch (error) {
    console.error("[mysql.connector][initializeMySqlConnector][Error]:", error);
    throw new Error("Failed to initialize MySQL pool");
  }
};

export const execute = async <T>(query: string, params?: any[]): Promise<T> => {
  try {
    if (!pool) {
      await initializeMySqlConnector();
    }

    const [results] = await pool!.execute(query, params);
    return results as T;
  } catch (error) {
    console.error("[mysql.connector][execute][Error]:", error);
    throw error;
  }
};
