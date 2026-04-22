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
    </div>
  );
}

export default ProjectList;