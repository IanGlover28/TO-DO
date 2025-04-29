import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import Splash from './components/Splash';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Splash />
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Routes>
          {/* <Route path="/welcome" element={<WelcomeScreen />} /> */}
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
