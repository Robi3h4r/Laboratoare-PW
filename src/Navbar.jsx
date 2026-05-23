import { NavLink } from 'react-router';

function Navbar() {
  // Stilul pentru meniului
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '15px 0',
    background: 'var(--code-bg)',
    borderBottom: '1px solid var(--border)',
    marginBottom: '30px'
  };

  // Stilul de bază pentru fiecare link (folosește starea isActive din react-router)
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? 'var(--accent)' : 'var(--text)',
    fontWeight: isActive ? 'bold' : '500',
    padding: '8px 16px',
    borderRadius: '6px',
    background: isActive ? 'var(--accent-bg)' : 'transparent',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/projects" style={linkStyle}>Proiecte</NavLink>
      <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
      <NavLink to="/about" style={linkStyle}>About</NavLink>
    </nav>
  );
}

export default Navbar;