const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

// Dados em memória
let alunos = [];
let professores = [];
let turmas = [];

// --- ALUNOS ---
// POST /alunos
app.post('/alunos', (req, res) => {
	const aluno = { id: Date.now().toString(), ...req.body };
	alunos.push(aluno);
	res.status(201).json(aluno);
});

// GET /alunos
app.get('/alunos', (req, res) => {
	res.json(alunos);
});

// GET /alunos/:id
app.get('/alunos/:id', (req, res) => {
	const aluno = alunos.find(a => a.id === req.params.id);
	if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
	res.json(aluno);
});

// PUT /alunos/:id
app.put('/alunos/:id', (req, res) => {
	const idx = alunos.findIndex(a => a.id === req.params.id);
	if (idx === -1) return res.status(404).json({ erro: 'Aluno não encontrado' });
	alunos[idx] = { ...alunos[idx], ...req.body };
	res.json(alunos[idx]);
});

// DELETE /alunos/:id
app.delete('/alunos/:id', (req, res) => {
	const idx = alunos.findIndex(a => a.id === req.params.id);
	if (idx === -1) return res.status(404).json({ erro: 'Aluno não encontrado' });
	alunos.splice(idx, 1);
	res.status(204).send();
});

// --- PROFESSORES ---
// POST /professores
app.post('/professores', (req, res) => {
	const professor = { id: Date.now().toString(), ...req.body };
	professores.push(professor);
	res.status(201).json(professor);
});

// GET /professores
app.get('/professores', (req, res) => {
	res.json(professores);
});

// GET /professores/:id
app.get('/professores/:id', (req, res) => {
	const professor = professores.find(p => p.id === req.params.id);
	if (!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
	res.json(professor);
});

// PUT /professores/:id
app.put('/professores/:id', (req, res) => {
	const idx = professores.findIndex(p => p.id === req.params.id);
	if (idx === -1) return res.status(404).json({ erro: 'Professor não encontrado' });
	professores[idx] = { ...professores[idx], ...req.body };
	res.json(professores[idx]);
});

// DELETE /professores/:id
app.delete('/professores/:id', (req, res) => {
	const idx = professores.findIndex(p => p.id === req.params.id);
	if (idx === -1) return res.status(404).json({ erro: 'Professor não encontrado' });
	professores.splice(idx, 1);
	res.status(204).send();
});

// --- TURMAS ---
// POST /turmas
app.post('/turmas', (req, res) => {
	const turma = { id: Date.now().toString(), alunos: [], ...req.body };
	turmas.push(turma);
	res.status(201).json(turma);
});

// GET /turmas
app.get('/turmas', (req, res) => {
	const turmasComQtd = turmas.map(t => ({ ...t, qtdAlunos: t.alunos.length }));
	res.json(turmasComQtd);
});

// GET /turmas/:id
app.get('/turmas/:id', (req, res) => {
	const turma = turmas.find(t => t.id === req.params.id);
	if (!turma) return res.status(404).json({ erro: 'Turma não encontrada' });
	res.json(turma);
});

// PUT /turmas/:id
app.put('/turmas/:id', (req, res) => {
	const idx = turmas.findIndex(t => t.id === req.params.id);
	if (idx === -1) return res.status(404).json({ erro: 'Turma não encontrada' });
	turmas[idx] = { ...turmas[idx], ...req.body };
	res.json(turmas[idx]);
});

// DELETE /turmas/:id
app.delete('/turmas/:id', (req, res) => {
	const idx = turmas.findIndex(t => t.id === req.params.id);
	if (idx === -1) return res.status(404).json({ erro: 'Turma não encontrada' });
	if (turmas[idx].alunos.length > 0) return res.status(400).json({ erro: 'Não é possível remover turma com alunos matriculados' });
	turmas.splice(idx, 1);
	res.status(204).send();
});

app.get('/', (req, res) => {
		res.send('Servidor Node rodando com Express!');

});



app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});

