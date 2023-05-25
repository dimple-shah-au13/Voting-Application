//const Pool = require('pg').Pool;
import pg from "pg";
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({ path: 'config.env' });

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

console.log(chalk.bgRedBright.black('db connected  🟢 '));
export default pool;    