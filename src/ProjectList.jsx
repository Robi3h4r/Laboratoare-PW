import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  useEffect(function() {
    fetch('http://localhost:3000/api/projects')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
       setProjects(data);
        setLoading(false);
      })
      .catch(function() {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);
  
  // Am adăugat "e" și "e.preventDefault()" ca să nu se dea refresh la pagină
  async function handleSubmit(e) {
    e.preventDefault(); 
 try {
 const response = await fetch('http://localhost:3000/api/projects', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ title: title, tech: tech }),
 });
 const newProject = await response.json();
 setProjects([...projects, newProject]);
 setTitle(''); // Goleste input-urile
 setTech('');
 } catch (err) {
 console.error('Eroare:', err);
 }
}

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Se incarca...</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>

      {/* Am adăugat formularul ca să poți folosi funcția handleSubmit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Titlu proiect" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          placeholder="Tehnologii" 
          value={tech} 
          onChange={(e) => setTech(e.target.value)} 
        />
        <button type="submit">Adaugă Proiect</button>
      </form>

      <input 
        type="text"
        placeholder="Cauta proiect..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {projects
        .filter(function(p) {
          return p.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map(function(p) {
          return (
            // Am schimbat p.id în p._id pentru că MongoDB așa le salvează
            <Card key={p._id} title={p.title} />
          );
        })
      }

      <div style={{ marginTop: '20px', borderTop: '1px solid black' }}>
        <p>Total proiecte: {projects.length}</p>
        <p>Finalizate: {projects.filter(p => p.done).length}</p>
        <p>In lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;