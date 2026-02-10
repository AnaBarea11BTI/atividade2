import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "benserverplex.ddns.net",
  user: "alunos",
  password: "senhaAlunos",
  database: "web_03mb"
});