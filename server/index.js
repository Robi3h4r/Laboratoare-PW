const express = require('express');
const app = express();
const Project = require('./models/Project');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
 console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
 console.error('Eroare conectare MongoDB:', err);
 });

const PORT = 3000;

// Pas 1: Adăugați middleware-ul pentru JSON (permite serverului să citească body-ul cererilor). Puneți înainte de rute:
app.use(express.json());

// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
// (Aici array-ul const projects a fost șters conform Pasului 2)

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

// Pas 3: Rescrieți ruta GET. Metodele Mongoose sunt asincrone — folosiți async/await:
app.get('/api/projects', async function(req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

// GET /api/projects/:id — returnează un singur proiect după id
/*
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
*/

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
  // req.body conține datele trimise de client în cererea POST. Middleware-ul express.json() le parsează automat din JSON în obiect JavaScript.
  // NOTĂ: Această rută încă folosește logica veche cu array-ul projects (care acum lipsește). 
  // O vei rescrie la Exercițiul 5.
  const newProject = {
    title: req.body.title,
    tech: req.body.tech,
    done: req.body.done || false,
  };
  // projects.push(newProject); // Aceasta va da eroare până la următorul exercițiu
  res.status(201).json(newProject);
});

// DELETE /api/projects/:id — ștergere proiect
app.delete('/api/projects/:id', function(req, res) {
  // Această rută va fi și ea rescrisă pentru MongoDB.
  res.json({ message: 'Ruta DELETE va fi actualizată' });
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});