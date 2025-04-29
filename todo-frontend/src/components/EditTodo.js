import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify'; // Uncomment if using react-toastify

function EditTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Invalid Todo ID');
      setLoading(false);
      return;
    }

    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/todos/${id}`);
        console.log('Fetched Todo:', res.data);

        const { title, description, completed } = res.data;
        setTitle(title);
        setDescription(description || '');
        setCompleted(completed);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Todo not found');
        } else {
          setError('Error fetching todo');
        }
        setLoading(false);
        console.error('Error fetching todo:', err);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await axios.put(`http://localhost:5050/api/todos/${id}`, {
        title,
        description,
        completed
      });

      // toast.success('Todo updated successfully'); // Uncomment if using toast
      navigate('/');
    } catch (err) {
      setError('Error updating todo');
      console.error('Error updating todo:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Todo</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input 
            id="title"
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description (optional)
          </label>
          <textarea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={completed} 
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Completed</span>
          </label>
        </div>
        <button 
          type="submit" 
          disabled={!title.trim()}
          className={`w-full font-bold py-2 px-4 rounded transition-colors ${
            title.trim() 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          Update Todo
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
