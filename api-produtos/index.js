
const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let produtos = [
  { id: 1, nome: 'Notebook', preco: 3500.00, quantidade: 10 },
  { id: 2, nome: 'Mouse Sem Fio', preco: 80.00, quantidade: 25 }
];


let proximoId = 3;


app.get('/produtos', (req, res) => {
  return res.status(200).json(produtos);
});


app.post('/produtos', (req, res) => {
  const { nome, preco, quantidade } = req.body;

  
  if (!nome || preco === undefined || quantidade === undefined) {
    return res.status(400).json({ 
      mensagem: 'Por favor, informe os campos nome, preco e quantidade.' 
    });
  }

  const novoProduto = {
    id: proximoId++,
    nome,
    preco: Number(preco),
    quantidade: Number(quantidade)
  };

  produtos.push(novoProduto);

  return res.status(201).json(novoProduto);
});


app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  const index = produtos.findIndex(p => p.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }

  
  produtos[index] = {
    id: produtos[index].id,
    nome: nome !== undefined ? nome : produtos[index].nome,
    preco: preco !== undefined ? Number(preco) : produtos[index].preco,
    quantidade: quantidade !== undefined ? Number(quantidade) : produtos[index].quantidade
  };

  return res.status(200).json(produtos[index]);
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  const index = produtos.findIndex(p => p.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }

  const produtoRemovido = produtos.splice(index, 1)[0];

  return res.status(200).json({
    mensagem: 'Produto excluído com sucesso.',
    produto: produtoRemovido
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});