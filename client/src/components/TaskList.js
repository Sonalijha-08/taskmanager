import React from 'react';
import TaskItem from './TaskItem';
import { ListTodo, CheckSquare } from 'lucide-react';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="task-list">
      <div className="list-header">
        <h2>
          <ListTodo className="accent-icon" /> 
          Your Tasks
        </h2>
        {tasks.length > 0 && (
          <div className="task-stats">
            <CheckSquare size={14} /> 
            {completedCount}/{tasks.length} Completed
          </div>
        )}
      </div>
      
      {tasks.length === 0 ? (
        <p className="task-list-empty">No tasks found. Start by adding one above!</p>
      ) : (
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
      )}
    </div>
  );
}

export default TaskList;