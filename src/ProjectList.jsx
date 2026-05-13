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

  async function handleDelete(id) {
    try {
      await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'DELETE'
      });
      
      // Actualizăm lista locală: păstrăm doar proiectele care NU au id-ul șters
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error('Eroare la ștergere:', err);
    }
  }

  // CERINȚA NOUĂ: Funcția handleToggle pentru a schimba starea (done/not done)
  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone }) // Inversăm starea actuală
      });
      
      const updatedProject = await response.json();
      
      // Actualizăm starea: dacă _id se potrivește, punem obiectul nou, altfel îl lăsăm pe cel vechi
      setProjects(projects.map(p => p._id === id ? updatedProject : p));
    } catch (err) {
      console.error('Eroare la actualizare:', err);
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
            <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <Card title={p.title} />
              
              {/* Butonul de Toggle (Finalizare/Repunere în lucru) */}
              <button 
                onClick={() => handleToggle(p._id, p.done)}
                style={{ backgroundColor: p.done ? 'orange' : 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                {p.done ? 'Reia' : 'Finalizează'}
              </button>

              {/* Butonul de ștergere adăugat conform Exercițiului 5 */}
              <button 
                onClick={() => handleDelete(p._id)}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Șterge
              </button>
            </div>
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