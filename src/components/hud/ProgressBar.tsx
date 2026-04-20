import React from 'react';

interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({ value, color }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="hud-progress">
      <div
        className={`hud-progress__fill ${color === 'amber' ? 'hud-progress--amber' : ''}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
