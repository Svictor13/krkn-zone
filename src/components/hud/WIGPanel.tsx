import React from 'react';
import type { Task } from '../../lib/types';
import ProgressBar from './ProgressBar';

interface WIGPanelProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

export default function WIGPanel({ tasks, onToggle }: WIGPanelProps) {
  const completed = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="wig-panel">
      <h2 className="wig-header">TODAY'S WIGs</h2>
      {total === 0 ? (
        <p className="wig-empty">No WIGs set for today</p>
      ) : (
        <>
          <ul className="wig-list">
            {tasks.map(task => (
              <li key={task.id} className="wig-item">
                <button
                  className={`task-checkbox ${task.status === 'done' ? 'checked' : ''}`}
                  onClick={() => onToggle(task.id)}
                />
                <span className={task.status === 'done' ? 'task-done' : ''}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
          <ProgressBar value={progress} />
        </>
      )}
    </div>
  );
}
