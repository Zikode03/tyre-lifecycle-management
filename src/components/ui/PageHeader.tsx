import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-brand-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">{eyebrow}</p>}
        <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-3xl text-sm text-brand-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
