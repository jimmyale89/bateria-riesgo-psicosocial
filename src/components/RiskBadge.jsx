import React from 'react';

export function getRiskColors(level) {
  const norm = String(level || '').trim().toUpperCase();
  if (norm.includes('MUY ALTO')) {
    return {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      dot: 'bg-red-500',
      badge: 'bg-red-500 text-white'
    };
  }
  if (norm.includes('ALTO')) {
    return {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-300',
      dot: 'bg-orange-500',
      badge: 'bg-orange-500 text-white'
    };
  }
  if (norm.includes('MEDIO')) {
    return {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-300',
      dot: 'bg-amber-500',
      badge: 'bg-amber-500 text-white'
    };
  }
  if (norm.includes('BAJO')) {
    return {
      bg: 'bg-lime-100',
      text: 'text-lime-800',
      border: 'border-lime-300',
      dot: 'bg-lime-500',
      badge: 'bg-lime-600 text-white'
    };
  }
  if (norm.includes('SIN RIESGO') || norm.includes('DESPRECIABLE')) {
    return {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      dot: 'bg-emerald-500',
      badge: 'bg-emerald-600 text-white'
    };
  }
  return {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    dot: 'bg-slate-400',
    badge: 'bg-slate-400 text-white'
  };
}

export default function RiskBadge({ level, size = 'sm', showDot = true }) {
  const colors = getRiskColors(level);
  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-xs font-bold' : 'px-2 py-0.5 text-[11px] font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses}`}>
      {showDot && <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>}
      {level || 'N/A'}
    </span>
  );
}
