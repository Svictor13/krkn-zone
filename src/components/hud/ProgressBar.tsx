import React from 'react';

interface ProgressBarProps {
  value: number;
  color?: string;
}

export default function ProgressBar({ value, color = 'cyan' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${clampedValue}%`, backgroundColor: color }}
      />
    </div>
  );
}
