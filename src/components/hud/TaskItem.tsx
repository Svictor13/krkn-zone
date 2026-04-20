import React from 'react';
import type { Task } from '../../lib/types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const isDone = task.status === 'done';

  return (
    <div className="task-item">
      <button
        className={`task-checkbox ${isDone ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={isDone ? 'Mark as active' : 'Mark as done'}
      />
      <div className="task-content" onClick={() => onEdit(task)}>
        <span className={`task-title ${isDone ? 'task-done' : ''}`}>
          {task.title}
        </span>
        <div className="task-meta">
          {task.is_wig && <span className="badge badge-wig">WIG</span>}
          {task.due_date && (
            <span className="badge badge-due">{task.due_date}</span>
          )}
          <span className="badge badge-context">{task.context}</span>
        </div>
      </div>
      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        &times;
      </button>
    </div>
  );
}
