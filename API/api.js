const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(bodyParser.json()); // permite receber JSON no corpo da requisição
app.use(cors())
// Conexão com banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'padariadb'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
    return;
  }
  console.log('Conectado ao banco!');
});

// GET - Listar todos os produtos
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST - Adicionar novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const sql = 'INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)';
  db.query(sql, [nome, preco, quantidade], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, nome, preco, quantidade });
  });
});

// PUT - Atualizar produto por ID
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;
  const sql = 'UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?';
  db.query(sql, [nome, preco, quantidade, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto atualizado com sucesso' });
  });
});

// DELETE - Remover produto por ID :)
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
//code maked by jp