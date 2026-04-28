export type GTDContext = 'phone' | 'online' | 'office' | 'home' | 'studio' | 'errands';

export type KanbanLane = 'backlog' | 'today' | 'doing' | 'waiting' | 'done';

export const KANBAN_LANES: { key: KanbanLane; label: string }[] = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'today',   label: 'Today' },
  { key: 'doing',   label: 'Doing' },
  { key: 'waiting', label: 'Waiting' },
  { key: 'done',    label: 'Done' },
];

export interface Task {
  id: string;
  title: string;
  notes: string | null;
  context: GTDContext;
  status: 'active' | 'done' | 'someday';
  is_wig: boolean;
  priority: number;
  due_date: string | null;
  created_at: string;
  completed_at: string | null;
  sort_order: number;
  // HUD v3 additions (nullable until migration applied)
  project_id?: string | null;
  sprint_id?: string | null;
  estimated_minutes?: number | null;
  kanban_lane?: KanbanLane | null;
}

export interface Project {
  id: string;
  name: string;
  color: string | null;
  status: 'active' | 'paused' | 'done' | 'archived';
  sort_order: number;
  created_at: string;
}

export interface Sprint {
  id: string;
  name: string | null;
  start_date: string;
  end_date: string;
  scope_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface TimeLog {
  id: string;
  task_id: string;
  started_at: string;
  stopped_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface GmailStatus {
  account: string;
  unread_count: number;
  oldest_unread_age_minutes: number | null;
  last_synced_at: string;
}

export interface CalendarEvent {
  id: string;
  source: 'apple' | 'google' | 'manual';
  external_id: string | null;
  title: string;
  starts_at: string;
  ends_at: string;
  calendar_name: string | null;
  is_all_day: boolean;
  notes: string | null;
}

export const CONTEXTS: { key: GTDContext; label: string; icon: string }[] = [
  { key: 'phone', label: 'Phone', icon: '📱' },
  { key: 'online', label: 'Online', icon: '💻' },
  { key: 'office', label: 'Office', icon: '🏢' },
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'studio', label: 'Studio', icon: '🎨' },
  { key: 'errands', label: 'Errands', icon: '🚗' },
];
