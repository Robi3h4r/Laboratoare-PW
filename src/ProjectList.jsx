import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  // 1. STATE-URILE PENTRU DATE ȘI UI
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  // ex2
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');

  // 2. FETCH INIȚIAL (Citesc proiectele din MongoDB)
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

  // 3. LOGICA PENTRU ADĂUGARE (POST)
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
      setTitle(''); // Goleste input-ul
      setTech('');  // Goleste input-ul
    } catch (err) {
      console.error('Eroare la adaugare:', err);
    }
  }

  // 4. LOGICA PENTRU ȘTERGERE (DELETE)
  async function handleDelete(id) {
    try {
      await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'DELETE'
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error('Eroare la stergere:', err);
    }
  }

  // 5. LOGICA PENTRU TOGGLE DONE (PUT)
  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone })
      });
      const updatedProject = await response.json();
      setProjects(projects.map(p => p._id === id ? updatedProject : p));
    } catch (err) {
      console.error('Eroare la toggle:', err);
    }
  }

  // 6. LOGICA PENTRU EDITARE (PUT - Nou)
  const startEdit = (project) => {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditTech(project.tech);
  };

  async function handleSave(id) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech })
      });
      const updated = await response.json();
      setProjects(projects.map(p => p._id === id ? updated : p));
      setEditingId(null); // Inchid modul de editare
    } catch (err) {
      console.error("Eroare la salvare:", err);
    }
  }

  // 7. CONDIȚII DE AFIȘARE (Loading/Error)
  if (error) return <p>{error}</p>;
  if (loading) return <p>Se incarca...</p>;

  // 8. RENDERUL PRINCIPAL
  return (
    <div>
      <h3>Proiectele mele</h3>

      {/* Formular Adaugare */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px padding: 10px' }}>
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

      {/* Cauta proiect */}
      <input 
        type="text"
        placeholder="Cauta proiect..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />

      {/* Lista Proiecte */}
      {projects
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(function(p) {
          // DACA PROIECTUL ESTE IN MODUL EDITARE
          if (editingId === p._id) {
            return (
              <div key={p._id} style={{ border: '1px solid #007bff', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input value={editTech} onChange={(e) => setEditTech(e.target.value)} />
                <button onClick={() => handleSave(p._id)}>Salvează</button>
                <button onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>Anulează</button>
              </div>
            );
          }

          // DACA PROIECTUL ESTE AFISAT NORMAL
          return (
            <div key={p._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <Card title={p.title} />
              
              <button onClick={() => startEdit(p)}>Editează</button>
              
              <button 
                onClick={() => handleToggle(p._id, p.done)}
                style={{ backgroundColor: p.done ? '#ffc107' : '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                {p.done ? 'Reia' : 'Finalizează'}
              </button>

              <button 
                onClick={() => handleDelete(p._id)}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Șterge
              </button>
            </div>
          );
        })
      }

      {/* Statistici */}
      <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>Total proiecte: {projects.length}</p>
        <p>Finalizate: {projects.filter(p => p.done).length}</p>
        <p>In lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;
