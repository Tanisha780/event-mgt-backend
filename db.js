require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const testConnection=async()=>{
  try{const res = await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL:", res.rows[0]);
  } catch (err) {
    console.error(" Error connecting:", err);
  }
};
testConnection();

module.exports = pool;
