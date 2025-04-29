import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/todos');
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`http://localhost:5050/api/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed
      });
      fetchTodos();
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen text-white py-8">
      <h2 className="text-2xl font-bold mb-6"></h2>
      {todos.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No tasks yet. Create one!</p>
      ) : (
        <ul className="space-y-4">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`bg-gray-800 rounded-lg shadow p-4 ${todo.completed ? 'border-l-4 border-green-400' : 'border-l-4 border-yellow-400'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox"
                    className="mt-1.5 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={todo.completed} 
                    onChange={() => toggleComplete(todo)}
                  />
                  <div>
                    <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                        {todo.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link 
                    to={`/edit/${todo.id}`} 
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteTodo(todo.id)} 
                    className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
