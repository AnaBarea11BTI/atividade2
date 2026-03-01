import express from "express";
import cors from "cors";
import { connection } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/produtos", (req, res) => {
  const sql = "SELECT * FROM produtos_anabarea";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

app.get("/produtos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM produtos_anabarea WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results[0]);
  });
});

app.post("/produtos", (req, res) => {
  const { nome, preco, descricao } = req.body;

  const sql =
    "INSERT INTO produtos_anabarea (nome, preco, descricao) VALUES (?, ?, ?)";
  connection.query(sql, [nome, preco, descricao], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ mensagem: "Produto cadastrado com sucesso!" });
  });
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao } = req.body;

  const sql =
    "UPDATE produtos_anabarea SET nome = ?, preco = ?, descricao = ? WHERE id = ?";

  connection.query(sql, [nome, preco, descricao, id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ mensagem: "Produto atualizado com sucesso!" });
  });
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM produtos_anabarea WHERE id = ?";
  connection.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({ mensagem: "Produto deletado com sucesso!" });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});