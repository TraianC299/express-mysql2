const mysql = require("mysql2");
  
const pool = mysql.createPool({
  connectionLimit: 5,
  host: '127.0.0.1',
  user: 'root',
  password: 'mysqlsql86',
  database: 'sql_store'
})
 



module.exports = pool;
