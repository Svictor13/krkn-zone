export type GTDContext = 'phone' | 'online' | 'office' | 'home' | 'studio' | 'errands';

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
}

export const CONTEXTS: { key: GTDContext; label: string; icon: string }[] = [
  { key: 'phone', label: 'Phone', icon: '📱' },
  { key: 'online', label: 'Online', icon: '💻' },
  { key: 'office', label: 'Office', icon: '🏢' },
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'studio', label: 'Studio', icon: '🎨' },
  { key: 'errands', label: 'Errands', icon: '🚗' },
];
