import React from 'react';
import { CONTEXTS, type GTDContext } from '../../lib/types';

interface ContextBarProps {
  selected: GTDContext;
  counts: Record<GTDContext, number>;
  onSelect: (context: GTDContext) => void;
}

export default function ContextBar({ selected, counts, onSelect }: ContextBarProps) {
  return (
    <div className="hud-tabs">
      {CONTEXTS.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`hud-tab ${selected === key ? 'hud-tab--active' : ''}`}
          onClick={() => onSelect(key)}
        >
          {icon} {label}
          <span className="hud-tab__count">{counts[key] || 0}</span>
        </button>
      ))}
    </div>
  );
}
