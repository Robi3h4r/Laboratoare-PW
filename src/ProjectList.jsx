import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(function() {
    fetch('/data/projects.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function() {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Se incarca...</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>

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
            <Card key={p.id} title={p.title} />
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