const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


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

// GET /api/projects/:id — returnează un singur proiect după id din MongoDB
app.get('/api/projects/:id', async function(req, res) {
  try {
    // Hint: Folosiți await Project.findById(req.params.id) pentru a citi id-ul din URL
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      
      return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'ID invalid sau eroare server' });
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

// DELETE /api/projects/:id — ștergere proiect din MongoDB
app.delete('/api/projects/:id', async function(req, res) {
  try {
    // Hint: Folosiți await Project.findByIdAndDelete(req.params.id)
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      // Dacă nu există: status 404
      return res.status(404).json({ error: 'Not found' });
    }
    
    // Dacă există: res.json({ message: 'Deleted' })
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la stergere' });
  }
});

// Porneste serverul (Întotdeauna la final)
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});

//hi hi