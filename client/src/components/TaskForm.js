import React, { useState, useEffect } from 'react';

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.trim() === '') {
      setFormError('Title is required');
      return;
    }

    if (formData.title.trim().length > 100) {
      setFormError('Title cannot exceed 100 characters');
      return;
    }

    if (formData.description && formData.description.trim().length > 500) {
      setFormError('Description cannot exceed 500 characters');
      return;
    }

    if (formData.category && formData.category.trim().length > 50) {
      setFormError('Category cannot exceed 50 characters');
      return;
    }

    setFormError(null);

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null
    };

    onSubmit(submitData);

    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        category: ''
      });
    }
  };

  return (
    <div className="task-form-container">
      <h2>{initialData ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="100"
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
            placeholder="Enter task description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            maxLength="50"
            placeholder="Enter category (e.g., Work, Personal)"
          />
        </div>

        {formError && <div className="error-message" style={{ marginBottom: '1rem' }}>{formError}</div>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Task' : 'Add Task'}
          </button>
          {initialData && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;