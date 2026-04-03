import React from 'react';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          {task.category && <span className="task-category">{task.category}</span>}
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
              Due: {formatDate(task.dueDate)}
            </span>
          )}
          <span className="task-created">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button
            onClick={() => onToggleComplete(task._id)}
            className="btn btn-success"
            title="Mark as completed"
          >
            ✓ Complete
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="btn btn-secondary"
          title="Edit task"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn btn-danger"
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;