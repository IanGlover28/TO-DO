import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';

import './index.css';



function AppContent() {
  const location = useLocation();
 
  return (
      <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      {location.pathname !== '/welcome' && <Navbar />}
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/create" element={<CreateTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </div>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}


export default App;
