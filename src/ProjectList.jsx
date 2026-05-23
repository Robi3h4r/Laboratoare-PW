import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  // 1. STATE-URILE PENTRU DATE ȘI UI
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Adăugare
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  // Editare
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
      setTitle(''); 
      setTech('');  
    } catch (err) {
      console.error('Eroare la adaugare:', err);
    }
  }

  // 4. LOGICA PENTRU ȘTERGERE (DELETE)
  async function handleDelete(id) {
    if (window.confirm('Sigur doriți să ștergeți acest proiect?')) {
      try {
        await fetch('http://localhost:3000/api/projects/' + id, {
          method: 'DELETE'
        });
        setProjects(projects.filter(p => p._id !== id));
      } catch (err) {
        console.error('Eroare la stergere:', err);
      }
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

  // 6. LOGICA PENTRU EDITARE (PUT)
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
      setEditingId(null); 
    } catch (err) {
      console.error("Eroare la salvare:", err);
    }
  }

  // Stiluri comune pentru butoane brute
  const btnStyle = {
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    color: 'white',
    transition: 'opacity 0.2s'
  };

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    background: 'var(--code-bg)',
    color: 'var(--text-h)',
    fontSize: '15px'
  };

  // 7. CONDIȚII DE AFIȘARE (Loading/Error)
  if (error) return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;
  if (loading) return <p style={{ padding: '20px' }}>Se încarcă datele...</p>;

  // 8. RENDERUL PRINCIPAL
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', textAlign: 'left' }}>
      
      {/* Formular Adăugare Stilizat */}
      <form onSubmit={handleSubmit} style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '1px solid var(--border)', 
        borderRadius: '10px',
        background: 'var(--code-bg)',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-h)' }}>Adaugă un proiect nou</h4>
        <input 
          style={inputStyle}
          placeholder="Titlu proiect" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          style={inputStyle}
          placeholder="Tehnologii folosite (ex: React, Node)" 
          value={tech} 
          onChange={(e) => setTech(e.target.value)} 
        />
        <button type="submit" style={{ ...btnStyle, backgroundColor: 'var(--accent)', alignSelf: 'flex-start', padding: '8px 16px' }}>
          + Adaugă Proiect
        </button>
      </form>

      {/* Căutare Proiect */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="🔍 Caută un proiect după titlu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
        />
      </div>

      {/* Lista Proiecte */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {projects
          .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(function(p) {
            
            // FORMULAR EDITARE (Când editingId === p._id)
            if (editingId === p._id) {
              return (
                <div key={p._id} style={{ 
                  border: '2px solid #007bff', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  background: 'var(--code-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <input style={inputStyle} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <input style={inputStyle} value={editTech} onChange={(e) => setEditTech(e.target.value)} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleSave(p._id)} style={{ ...btnStyle, backgroundColor: '#28a745' }}>Salvează</button>
                    <button onClick={() => setEditingId(null)} style={{ ...btnStyle, backgroundColor: '#6c757d' }}>Anulează</button>
                  </div>
                </div>
              );
            }

            // CARD PROIECT NORMAL
            return (
              <div key={p._id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center', 
                padding: '16px',
                borderRadius: '8px',
                boxShadow: 'var(--shadow)',
                borderLeft: p.done ? '6px solid #28a745' : '6px solid #ffc107',
                background: p.done ? 'rgba(40, 167, 69, 0.05)' : 'rgba(255, 193, 7, 0.05)',
                borderTop: '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)'
              }}>
                <div>
                  <Card title={p.title} />
                  {p.tech && <small style={{ color: 'var(--text)', fontSize: '13px' }}>🛠️ {p.tech}</small>}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Editează = Albastru */}
                  <button onClick={() => startEdit(p)} style={{ ...btnStyle, backgroundColor: '#007bff' }}>
                    Editează
                  </button>
                  
                  {/* Finalizează/Reia = Verde/Portocaliu */}
                  <button 
                    onClick={() => handleToggle(p._id, p.done)}
                    style={{ ...btnStyle, backgroundColor: p.done ? '#ffc107' : '#28a745' }}
                  >
                    {p.done ? 'Reia' : 'Finalizează'}
                  </button>

                  {/* Șterge = Roșu */}
                  <button 
                    onClick={() => handleDelete(p._id)}
                    style={{ ...btnStyle, backgroundColor: '#dc3545' }}
                  >
                    Șterge
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Secțiune mică Statistici locale jos */}
      <div style={{ marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '15px', color: 'var(--text)' }}>
        <p>Total proiecte listate: <b>{projects.length}</b> | Finalizate: <span style={{ color: '#28a745', fontWeight: 'bold' }}>{projects.filter(p => p.done).length}</span> | În lucru: <span style={{ color: '#ffc107', fontWeight: 'bold' }}>{projects.filter(p => !p.done).length}</span></p>
      </div>
    </div>
  );
}

export default ProjectList;