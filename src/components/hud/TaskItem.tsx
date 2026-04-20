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
    <div className={`hud-task ${isDone ? 'hud-task--done' : ''}`}>
      <input
        type="checkbox"
        className="hud-task__checkbox"
        checked={isDone}
        onChange={() => onToggle(task.id)}
      />
      <div className="hud-task__content" onClick={() => onEdit(task)} style={{ cursor: 'pointer' }}>
        <span className="hud-task__text">{task.title}</span>
        <div className="hud-task__meta">
          {task.is_wig && <span className="hud-badge hud-badge--wig">WIG</span>}
          {task.due_date && <span className="hud-badge hud-badge--active">{task.due_date}</span>}
          <span className="hud-badge hud-badge--someday">{task.context}</span>
        </div>
      </div>
      <button
        className="hud-task__delete"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        &times;
      </button>
    </div>
  );
}
