import { useEffect, useState } from "react";

function Home() {
  const [stats, setStats] = useState(null);

  useEffect(function() {
    fetch('http://localhost:3000/api/stats')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setStats(data);
      })
      .catch(function(err) {
        console.error("Eroare la preluarea statisticilor:", err);
      });
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Home</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>Bine ai venit pe dashboard-ul meu!</p>

      {stats ? (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          
          {/* Card Total */}
          <div style={{
            flex: '1 1 200px',
            padding: '20px',
            borderRadius: '10px',
            background: 'var(--code-bg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--text)' }}>Total Proiecte</h3>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-h)' }}>{stats.total}</span>
          </div>

          {/* Card Finalizate */}
          <div style={{
            flex: '1 1 200px',
            padding: '20px',
            borderRadius: '10px',
            background: 'rgba(40, 167, 69, 0.1)',
            border: '1px solid rgba(40, 167, 69, 0.3)',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>Finalizate</h3>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>{stats.done}</span>
          </div>

          {/* Card În Lucru */}
          <div style={{
            flex: '1 1 200px',
            padding: '20px',
            borderRadius: '10px',
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>În lucru</h3>
            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>{stats.inProgress}</span>
          </div>

        </div>
      ) : (
        <p>Se încarcă statisticile live...</p>
      )}
    </div>
  );
}

export default Home;