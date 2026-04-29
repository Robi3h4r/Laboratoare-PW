import { BrowserRouter, Routes, Route } from 'react-router';
import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Navbar from './Navbar';


function App() {
  return (
    <div>
      <BrowserRouter>
 <Navbar>
  <Routes>
   <Route path="/" element={<Home />} />
 <Route path="/projects" element={<Projects />} />
 <Route path="/contact" element={<Contact />} />
  </Routes>
 </Navbar>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/projects" element={<Projects />} />
 <Route path="/contact" element={<Contact />} />
 </Routes>
 </BrowserRouter>
      
      <Card/>
      <h1>Dashboard</h1>
      <h2>Test de pozitionare </h2>
      <p>Hopulele Robert </p>
      <ul>mere</ul>
      <ul>pere</ul>
      <p>Primul site jsx</p>

      <ProjectList />

      <QuickNote />

      <TodoList />

      <ContactForm
      Hello
      />
    </div>
  );
}

export default App;