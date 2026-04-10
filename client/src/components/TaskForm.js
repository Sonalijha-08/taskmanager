import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X, ClipboardList, Type, AlignLeft, Calendar, Layout } from 'lucide-react';

function TaskForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: ''
  });
  const [formError, setFormError] = useState(null);


  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
        category: initialData.category || ''
      });
      setFormError(null);
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        category: ''
      });
      setFormError(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ title: '', description: '', dueDate: '', category: '' });
    }
  };

  return (
    <div className="task-form-container">
      <h2>
        <ClipboardList className="accent-icon" /> 
        {initialData ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group full-width">
          <label htmlFor="title">
            <Type size={12} style={{ marginRight: '4px' }} /> Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            required
            maxLength="100"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">
            <AlignLeft size={12} style={{ marginRight: '4px' }} /> Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add some details..."
            rows="3"
            maxLength="500"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">
            <Calendar size={12} style={{ marginRight: '4px' }} /> Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">
            <Layout size={12} style={{ marginRight: '4px' }} /> Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Work, Personal"
            maxLength="50"
          />
        </div>

        <div className="form-actions">
          {initialData && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              <X size={18} /> Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {initialData ? <Save size={18} /> : <PlusCircle size={18} />}
            {initialData ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;