const express = require('express');
const app = express();
const PORT = 3000;

// Pas 1: Adăugați middleware-ul pentru JSON (permite serverului să citească body-ul cererilor). Puneți înainte de rute:
app.use(express.json());

// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
  { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
  { id: 2, title: "Calculator Buget", tech: "JS", done: true },
  { id: 3, title: "Dashboard React", tech: "React", done: false },
  { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
  res.json(projects);
});

// GET /api/projects/:id — returnează un singur proiect după id
app.get('/api/projects/:id', function(req, res) {
  // Hint: Folosiți req.params.id pentru a citi id-ul din URL. Căutați proiectul cu projects.find(p => p.id === parseInt(req.params.id)). Dacă nu există, trimiteți res.status(404).json({ error: 'Not found' })
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(project);
});

// GET /api/stats — returnează statistici: total proiecte, câte finalizate, câte în lucru
app.get('/api/stats', function(req, res) {
  // Hint: Calculați cu filter().length pe array-ul projects și returnați un obiect JSON
  res.json({
    total: projects.length,
    finalizate: projects.filter(p => p.done).length,
    inLucru: projects.filter(p => !p.done).length
  });
});

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
  // req.body conține datele trimise de client în cererea POST. Middleware-ul express.json() le parsează automat din JSON în obiect JavaScript.
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    tech: req.body.tech,
    done: req.body.done || false,
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// DELETE /api/projects/:id — ștergere proiect
app.delete('/api/projects/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    // Dacă nu există (index === -1): res.status(404).json({ error: 'Not found' })
    return res.status(404).json({ error: 'Not found' });
  }
  // Dacă există: projects.splice(index, 1) și res.json({ message: 'Deleted' })
  projects.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});