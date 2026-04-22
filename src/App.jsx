import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import ProjectList from './ProjectList';

function App() {
  return (
    <div>
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