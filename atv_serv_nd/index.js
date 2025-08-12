const express = require('express');
const app = express();
const port = 5000;

// Rota de teste
app.get('/', (req, res) => {
	res.send('Servidor Node rodando com Express!');
});

// Inicializa o servidor
app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});

