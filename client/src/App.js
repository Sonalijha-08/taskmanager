import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateTask = (taskData) => {
    if (taskData.title !== undefined && (!taskData.title || taskData.title.trim() === '')) {
      return 'Title is required and cannot be empty';
    }
    if (taskData.title !== undefined && taskData.title.trim().length > 100) {
      return 'Title cannot exceed 100 characters';
    }
    if (taskData.description !== undefined && taskData.description.trim().length > 500) {
      return 'Description cannot exceed 500 characters';
    }
    if (taskData.category !== undefined && taskData.category.trim().length > 50) {
      return 'Category cannot exceed 50 characters';
    }
    if (taskData.dueDate !== undefined && new Date(taskData.dueDate) < new Date()) {
      return 'Due date cannot be in the past';
    }
    return null;
  };

  const addTask = async (taskData) => {
    const validationError = validateTask(taskData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task');
      }

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setError(null);
      setSuccess('Task added successfully! 💪');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const updateTask = async (id, taskData) => {
    const validationError = validateTask(taskData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setEditingTask(null);
      setError(null);
      setSuccess('Task updated successfully! 🎉');
      setTimeout(() => setSuccess(null), 3000);
      return true;
    } catch (err) {
      setError(err.message);
      setSuccess(null);
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete task');
      }

      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const praises = [
    '🎉 Awesome!',
    '✨ Fantastic job!',
    '🚀 You nailed it!',
    '🎊 Outstanding!',
    '🌟 Excellent work!',
    '🎈 Well done!',
    '🥳 Amazing!',
    '💯 Perfect!'
  ];

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task && task.completed) {
      setError('Task is already completed');
      return;
    }
    setError(null);

    const completed = await updateTask(id, { completed: true });
    if (completed && task) {
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      setSuccess(`${randomPraise} "${task.title}" is now complete. Great work! 🏆`);
      
      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb86fc', '#4caf78', '#d4954a', '#f0ebe3', '#4caf78']
      });
      
      setTimeout(() => setSuccess(null), 5000);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <TaskForm
          onSubmit={editingTask ? (data) => updateTask(editingTask._id, data) : addTask}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
        />
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
