import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Task, GTDContext } from '../../lib/types';
import { CONTEXTS } from '../../lib/types';
import LoginGate from './LoginGate';
import WIGPanel from './WIGPanel';
import ContextBar from './ContextBar';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

export default function HUDApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedContext, setSelectedContext] = useState<GTDContext>('office');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .neq('status', 'done')
      .order('sort_order');

    if (!error && data) {
      setTasks(data as Task[]);
    }
  }

  async function handleToggle(id: string) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'done' ? 'active' : 'done';
    const completedAt = newStatus === 'done' ? new Date().toISOString() : null;

    // Optimistic update
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: newStatus, completed_at: completedAt } as Task : t
      )
    );

    await supabase
      .from('tasks')
      .update({ status: newStatus, completed_at: completedAt })
      .eq('id', id);
  }

  async function handleSave(taskData: Partial<Task>) {
    if (taskData.id) {
      await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', taskData.id);
    } else {
      await supabase
        .from('tasks')
        .insert(taskData);
    }

    setFormOpen(false);
    setEditingTask(null);
    fetchTasks();
  }

  async function handleDelete(id: string) {
    // Optimistic update
    setTasks(prev => prev.filter(t => t.id !== id));

    await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  const wigTasks = tasks.filter(t => t.is_wig && t.status === 'active');
  const filteredTasks = tasks.filter(t => t.context === selectedContext && t.status !== 'someday');

  const contextCounts = CONTEXTS.reduce((acc, { key }) => {
    acc[key] = tasks.filter(t => t.context === key && t.status === 'active').length;
    return acc;
  }, {} as Record<GTDContext, number>);

  return (
    <LoginGate>
      <div className="hud-dashboard">
        <WIGPanel tasks={wigTasks} onToggle={handleToggle} />
        <ContextBar
          selected={selectedContext}
          counts={contextCounts}
          onSelect={setSelectedContext}
        />
        <TaskList
          tasks={filteredTasks}
          context={selectedContext}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <button
          className="hud-fab"
          onClick={() => { setEditingTask(null); setFormOpen(true); }}
        >
          +
        </button>
        {formOpen && (
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onClose={() => { setFormOpen(false); setEditingTask(null); }}
          />
        )}
      </div>
    </LoginGate>
  );
}
