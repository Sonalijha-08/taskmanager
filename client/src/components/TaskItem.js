import React from 'react';
import { CheckCircle, Calendar, Tag, Trash2, Edit2, Clock } from 'lucide-react';

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

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0) && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          {task.category && (
            <span className="task-category">
              <Tag size={12} /> {task.category}
            </span>
          )}
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
              <Calendar size={12} /> Due: {formatDate(task.dueDate)}
            </span>
          )}
          <span className="task-created">
            <Clock size={12} /> {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button
            onClick={() => onToggleComplete(task._id)}
            className="btn btn-success btn-icon"
            title="Mark as completed"
          >
            <CheckCircle size={18} />
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="btn btn-secondary btn-icon"
          title="Edit task"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn btn-danger btn-icon"
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;