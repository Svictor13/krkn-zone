import React, { useState, useEffect } from 'react';
import { CONTEXTS, type GTDContext, type Task } from '../../lib/types';

interface TaskFormProps {
  task?: Task | null;
  onSave: (taskData: Partial<Task>) => void;
  onClose: () => void;
}

export default function TaskForm({ task, onSave, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [notes, setNotes] = useState(task?.notes || '');
  const [context, setContext] = useState<GTDContext>(task?.context || 'office');
  const [isWig, setIsWig] = useState(task?.is_wig || false);
  const [priority, setPriority] = useState(task?.priority || 1);
  const [dueDate, setDueDate] = useState(task?.due_date || '');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...(task?.id ? { id: task.id } : {}),
      title: title.trim(),
      notes: notes.trim() || null,
      context,
      is_wig: isWig,
      priority: isWig ? priority : 0,
      due_date: dueDate || null,
      status: 'active',
    });
  };

  return (
    <div className="hud-modal-overlay hud-modal-overlay--open" onClick={onClose}>
      <div className="hud-modal" onClick={e => e.stopPropagation()}>
        <div className="hud-modal__header">
          <span className="hud-modal__title">{task ? 'Edit Task' : 'New Task'}</span>
          <button className="hud-modal__close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="hud-form-group">
            <label>Title</label>
            <input
              className="hud-input"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Task title..."
              autoFocus
            />
          </div>

          <div className="hud-form-group">
            <label>Notes</label>
            <textarea
              className="hud-input hud-textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Optional notes..."
              rows={3}
            />
          </div>

          <div className="hud-form-group">
            <label>Context</label>
            <select
              className="hud-input hud-select"
              value={context}
              onChange={e => setContext(e.target.value as GTDContext)}
            >
              {CONTEXTS.map(({ key, label, icon }) => (
                <option key={key} value={key}>{icon} {label}</option>
              ))}
            </select>
          </div>

          <div className="hud-form-group">
            <label className="hud-toggle">
              <input
                type="checkbox"
                checked={isWig}
                onChange={e => setIsWig(e.target.checked)}
              />
              Wildly Important Goal
            </label>
          </div>

          {isWig && (
            <div className="hud-form-group">
              <label>Priority (1-5)</label>
              <input
                className="hud-input"
                type="number"
                min={1}
                max={5}
                value={priority}
                onChange={e => setPriority(Number(e.target.value))}
              />
            </div>
          )}

          <div className="hud-form-group">
            <label>Due Date</label>
            <input
              className="hud-input"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>

          <div className="hud-form-actions">
            <button type="button" className="hud-btn hud-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="hud-btn hud-btn--primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
