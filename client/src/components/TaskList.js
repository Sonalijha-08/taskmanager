import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      <div className="task-items">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;