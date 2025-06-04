const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos (como /js, /css, imagens)
app.use(express.static(path.join(__dirname)));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota da página de produtos
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'manageproducts.html'));
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
