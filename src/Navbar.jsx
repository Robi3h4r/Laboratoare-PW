import { Link } from 'react-router';
function Navbar() {
 return (
 <nav>
 <Link to="/">Home</Link>
 <Link to="/projects">Proiecte</Link>
 <Link to="/contact">Contact</Link>
 </nav>
 );
}
export default Navbar;