import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Navbar from './Navbar';
import NotFound from './pages/NotFound';
import About from './pages/About';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;