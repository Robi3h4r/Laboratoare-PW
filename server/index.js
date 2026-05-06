const express = require('express');
const app = express();
const PORT = 3000;
// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});

// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
 { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
 { id: 2, title: "Calculator Buget", tech: "JS", done: true },
 { id: 3, title: "Dashboard React", tech: "React", done: false },
 { id: 4, title: "API Meteo", tech: "React, API", done: false },
];
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
 res.json(projects);
});

app.get('/api/projects', function(req, res) {
const projectId = parseInt(req.params.id);
const project = projects.find(p => p.id === projectId);

if (project) {
    res.json(project)
}else {
    res.status(404).json({error: 'Not found'});
}
});

app.get('/api/stats', function(req, res) {
  const stats = {
    total: projects.length,
    finalizate: projects.filter(p => p.done).length,
    inLucru: projects.filter(p => !p.done).length
  };
  
  res.json(stats); // Trimitem statisticile calculate ca JSON
});

// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});

//hello from laptop
