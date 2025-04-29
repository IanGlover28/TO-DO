import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/Todolist';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/create" element={<CreateTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;


// import React, { useState, useEffect } from 'react';

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState('');

//   // Fetch existing todos on mount
//   useEffect(() => {
//     fetch('http://localhost:5000/api/todos')
//       .then(res => res.json())
//       .then(setTodos);
//   }, []);

//   // Create a new todo
//   const addTodo = async () => {
//     if (!title.trim()) return;
//     const res = await fetch('http://localhost:5000/api/todos', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title }),
//     });
//     const newTodo = await res.json();
//     setTodos([newTodo, ...todos]);
//     setTitle('');
//   };

//   // Toggle completed
//   const toggle = async (id, completed) => {
//     const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ completed: !completed }),
//     });
//     const updated = await res.json();
//     setTodos(todos.map(t => (t.id === id ? updated : t)));
//   };

//   // Delete a todo
//   const remove = async id => {
//     await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
//     setTodos(todos.filter(t => t.id !== id));
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 400 }}>
//       <h1>My Todos</h1>
//       <div style={{ marginBottom: 10 }}>
//         <input
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           placeholder="New todo…"
//         />
//         <button onClick={addTodo}>Add</button>
//       </div>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {todos.map(t => (
//           <li key={t.id} style={{ marginBottom: 8 }}>
//             <input
//               type="checkbox"
//               checked={t.completed}
//               onChange={() => toggle(t.id, t.completed)}
//             />
//             <span
//               style={{
//                 textDecoration: t.completed ? 'line-through' : 'none',
//                 marginLeft: 8,
//               }}
//             >
//               {t.title}
//             </span>
//             <button
//               onClick={() => remove(t.id)}
//               style={{ marginLeft: 12, color: 'red' }}
//             >
//               ✕
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
