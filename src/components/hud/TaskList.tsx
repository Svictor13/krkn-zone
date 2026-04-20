import React from 'react';
import type { Task, GTDContext } from '../../lib/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  context: GTDContext;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, context, onToggle, onEdit, onDelete }: TaskListProps) {
  const wigs = tasks
    .filter(t => t.is_wig)
    .sort((a, b) => a.priority - b.priority);

  const regular = tasks
    .filter(t => !t.is_wig)
    .sort((a, b) => a.sort_order - b.sort_order);

  const sorted = [...wigs, ...regular];

  if (sorted.length === 0) {
    return (
      <div className="task-list-empty">
        No tasks in this context
      </div>
    );
  }

  return (
    <div className="task-list">
      {sorted.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
