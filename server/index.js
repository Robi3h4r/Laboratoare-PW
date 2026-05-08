const express = require('express');
const app = express();
const Project = require('./models/Project'); // Pas 1: Importăm modelul

// Conectarea la baza de date
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
  .then(function() {
    console.log('Conectat la MongoDB!');
  })
  .catch(function(err) {
    console.error('Eroare conectare MongoDB:', err);
  });

const PORT = 3000;

// Pas 1: Adăugați middleware-ul pentru JSON (permite serverului să citească body-ul cererilor)
app.use(express.json());

// --- RUTE ---

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

// Exercițiul 4: Rescriere GET cu MongoDB
app.get('/api/projects', async function(req, res) {
  try {
    // Project.find() returnează toate documentele din colecția projects
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

// Exercițiul 5: Rescrieți POST cu MongoDB
app.post('/api/projects', async function(req, res) {
  try {
    const newProject = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done || false,
    });
    // Salvăm în baza de date în loc de array
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/projects/:id și /api/stats (Comentate pentru că foloseau array-ul vechi)
/*
app.get('/api/projects/:id', function(req, res) {
  // Hint: Folosiți req.params.id pentru a citi id-ul din URL. 
  // Va trebui rescris pentru MongoDB cu Project.findById(req.params.id)
});

app.get('/api/stats', function(req, res) {
  // Hint: Calculați cu filter().length pe array-ul projects
});
*/

// DELETE /api/projects/:id — ștergere proiect
app.delete('/api/projects/:id', function(req, res) {
  // Această rută va fi și ea rescrisă pentru MongoDB.
  res.json({ message: 'Ruta DELETE urmează să fie actualizată' });
});

// Porneste serverul (Întotdeauna la final)
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});