import React from 'react';
import { CONTEXTS, type GTDContext } from '../../lib/types';

interface ContextBarProps {
  selected: GTDContext;
  counts: Record<GTDContext, number>;
  onSelect: (context: GTDContext) => void;
}

export default function ContextBar({ selected, counts, onSelect }: ContextBarProps) {
  return (
    <div className="context-bar">
      {CONTEXTS.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`context-btn ${selected === key ? 'active' : ''}`}
          onClick={() => onSelect(key)}
        >
          <span className="context-icon">{icon}</span>
          <span className="context-label">{label}</span>
          <span className="context-count">{counts[key] || 0}</span>
        </button>
      ))}
    </div>
  );
}
