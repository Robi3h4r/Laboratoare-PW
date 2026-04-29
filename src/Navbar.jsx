import { NavLink } from 'react-router';
function Navbar() {
 return (
 <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/projects">Proiecte</NavLink>
    <NavLink to="/contact">Contact</NavLink>
 </nav>
 );
}
export default Navbar;