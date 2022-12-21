const Pool = require("pg").Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "Hidada4Zahidis",
        host: "164.92.200.193",
        port: "5432",
        database: "enrollis"
    }
);
  
module.exports = pool;
