const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
	res.send('Servidor Node rodando com Express!');

});


app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});

