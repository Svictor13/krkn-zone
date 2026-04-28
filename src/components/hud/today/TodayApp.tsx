import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Task, Project, Sprint, TimeLog, CalendarEvent, GmailStatus, KanbanLane } from '../../../lib/types';
import LoginGate from '../LoginGate';
import Col1Tasks from './Col1Tasks';
import Col2Calendar from './Col2Calendar';
import Col3Notes from './Col3Notes';
import Col4Status from './Col4Status';
import EODModal from './EODModal';
import GmailBadge from './GmailBadge';

interface ActiveTimer {
  log_id: string;
  task_id: string;
  started_at: string;
}

export default function TodayApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsSyncedAt, setEventsSyncedAt] = useState<string | null>(null);
  const [gmail, setGmail] = useState<GmailStatus[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [timer, setTimer] = useState<ActiveTimer | null>(null);
  const [loading, setLoading] = useState(true);
  const [eodOpen, setEodOpen] = useState(false);
  const [, setTick] = useState(0);

  const fetchAll = useCallback(async () => {
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd   = new Date(); todayEnd.setHours(23, 59, 59, 999);
    const [tRes, pRes, sRes, lRes, eRes, gRes] = await Promise.all([
      supabase.from('tasks').select('*').order('sort_order'),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('sprints').select('*').eq('is_active', true).limit(1).maybeSingle(),
      supabase.from('time_logs').select('*').order('started_at', { ascending: false }).limit(500),
      supabase.from('events').select('*')
        .gte('starts_at', todayStart.toISOString())
        .lte('starts_at', todayEnd.toISOString())
        .order('starts_at'),
      supabase.from('gmail_status').select('*'),
    ]);
    if (tRes.data) setTasks(tRes.data as Task[]);
    if (pRes.data) setProjects(pRes.data as Project[]);
    if (sRes.data) setSprint(sRes.data as Sprint);
    if (lRes.data) {
      const allLogs = lRes.data as TimeLog[];
      setLogs(allLogs);
      const open = allLogs.find(l => !l.stopped_at);
      if (open && !timer) {
        setTimer({ log_id: open.id, task_id: open.task_id, started_at: open.started_at });
      }
    }
    if (eRes.data) {
      const evList = eRes.data as CalendarEvent[];
      setEvents(evList);
      const newest = evList.reduce<string | null>((acc, e) => {
        const u = (e as any).updated_at as string | undefined;
        if (!u) return acc;
        return !acc || u > acc ? u : acc;
      }, null);
      setEventsSyncedAt(newest);
    }
    if (gRes.data) setGmail(gRes.data as GmailStatus[]);
    setLoading(false);
  }, [timer]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 30_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tick every second so the timer label updates
  useEffect(() => {
    if (!timer) return;
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  async function handleToggle(id: string) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const isDone = task.status === 'done';
    const newStatus = isDone ? 'active' : 'done';
    const newLane: KanbanLane = isDone ? 'today' : 'done';
    const completed_at = newStatus === 'done' ? new Date().toISOString() : null;

    setTasks(prev =>
      prev.map(t => (t.id === id
        ? { ...t, status: newStatus, kanban_lane: newLane, completed_at } as Task
        : t))
    );
    await supabase
      .from('tasks')
      .update({ status: newStatus, kanban_lane: newLane, completed_at })
      .eq('id', id);

    if (timer?.task_id === id && newStatus === 'done') {
      await stopTimer();
    }
  }

  async function moveTaskToLane(id: string, lane: KanbanLane) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    if (task.kanban_lane === lane) return;

    const patch: Partial<Task> = { kanban_lane: lane };
    if (lane === 'done') {
      patch.status = 'done';
      patch.completed_at = new Date().toISOString();
    } else if (task.status === 'done') {
      patch.status = 'active';
      patch.completed_at = null;
    }

    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } as Task : t)));
    await supabase.from('tasks').update(patch).eq('id', id);

    if (timer?.task_id === id && lane === 'done') {
      await stopTimer();
    }
  }

  async function startTimer(task_id: string) {
    if (timer) await stopTimer();
    const started_at = new Date().toISOString();
    const { data, error } = await supabase
      .from('time_logs')
      .insert({ task_id, started_at })
      .select()
      .single();
    if (error || !data) return;
    setTimer({ log_id: data.id, task_id, started_at });
    setLogs(prev => [data as TimeLog, ...prev]);
    await moveTaskToLane(task_id, 'doing');
  }

  async function stopTimer() {
    if (!timer) return;
    const stopped_at = new Date().toISOString();
    const log_id = timer.log_id;
    setTimer(null);
    await supabase.from('time_logs').update({ stopped_at }).eq('id', log_id);
    setLogs(prev => prev.map(l => (l.id === log_id ? { ...l, stopped_at } : l)));
  }

  function elapsedSeconds(): number {
    if (!timer) return 0;
    return Math.floor((Date.now() - new Date(timer.started_at).getTime()) / 1000);
  }

  const activeTask = activeTaskId ? tasks.find(t => t.id === activeTaskId) ?? null : null;
  const activeProject = activeTask?.project_id
    ? projects.find(p => p.id === activeTask.project_id) ?? null
    : null;

  const totalSecondsLoggedForActive = activeTask
    ? logs
        .filter(l => l.task_id === activeTask.id)
        .reduce((sum, l) => {
          const stop = l.stopped_at ? new Date(l.stopped_at).getTime() : Date.now();
          return sum + Math.max(0, Math.floor((stop - new Date(l.started_at).getTime()) / 1000));
        }, 0)
    : 0;

  async function postponeTask(id: string, newDueDate: string) {
    setTasks(prev =>
      prev.map(t => (t.id === id
        ? { ...t, due_date: newDueDate, kanban_lane: 'backlog', is_wig: false } as Task
        : t))
    );
    await supabase
      .from('tasks')
      .update({ due_date: newDueDate, kanban_lane: 'backlog', is_wig: false })
      .eq('id', id);
  }

  return (
    <LoginGate>
      <div className="hud-topbar">
        <GmailBadge statuses={gmail} />
        <button
          className="hud-eod-trigger"
          onClick={() => setEodOpen(true)}
          title="End-of-day reconciliation"
        >
          🌙 EOD
        </button>
      </div>
      <div className="hud-today">
        <Col1Tasks
          tasks={tasks}
          projects={projects}
          loading={loading}
          activeTaskId={activeTaskId}
          timerTaskId={timer?.task_id ?? null}
          timerSeconds={elapsedSeconds()}
          onToggle={handleToggle}
          onSelect={setActiveTaskId}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Col2Calendar events={events} syncedAt={eventsSyncedAt} />
        <Col3Notes
          task={activeTask}
          project={activeProject}
          totalSecondsLogged={totalSecondsLoggedForActive}
          isTimerRunning={timer?.task_id === activeTask?.id}
          onStartTimer={() => activeTask && startTimer(activeTask.id)}
          onStopTimer={stopTimer}
        />
        <Col4Status
          tasks={tasks}
          sprint={sprint}
          logs={logs}
          onSelect={setActiveTaskId}
          onMoveLane={moveTaskToLane}
        />
      </div>
      <EODModal
        open={eodOpen}
        tasks={tasks}
        logs={logs}
        onClose={() => setEodOpen(false)}
        onPostpone={postponeTask}
        onMoveLane={moveTaskToLane}
      />
    </LoginGate>
  );
}
