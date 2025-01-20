const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let respostas = [];
let ipAddresses = new Set();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Página inicial
app.get('/', (req, res) => {
  res.render('home');
});

// Página de formulário
app.get('/Resposta/Create', (req, res) => {
  res.render('form');
});

// Receber resposta
app.post('/Resposta/Create', (req, res) => {
  const ip = req.ip;
  if (!ipAddresses.has(ip)) {
    const resposta = {
      nome: req.body.Nome,
      respostas: [
        req.body.Resp1,
        req.body.Resp2,
        req.body.Resp3,
        req.body.Resp4,
        req.body.Resp5,
        req.body.Resp6
      ]
    };
    respostas.push(resposta);
    ipAddresses.add(ip);
    console.log(respostas);
    
    res.redirect('/Resposta');
  } else {
    res.send('Você já enviou uma resposta.');
  }
});

// Página para listar as respostas
app.get('/Resposta', (req, res) => {
  res.render('list', { respostas });
});

// Página para mostrar uma resposta aleatória
app.get('/Resposta/Display', (req, res) => {
    if (respostas.length === 0) {
      return res.render('display', { resposta: null });
    }
    
    const randomIndex = Math.floor(Math.random() * respostas.length);
    const respostaEscolhida = respostas.splice(randomIndex, 1)[0];
    res.render('display', { resposta: respostaEscolhida });
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});