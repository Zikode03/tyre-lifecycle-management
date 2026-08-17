import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * V2 page header deliberately avoids the old full-width divider treatment.
 * More breathing room and stronger type hierarchy make each workspace feel less like an admin template.
 */
export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.19em] text-zinc-500">{eyebrow}</p>
          </div>
        )}
        <h1 className="text-[30px] font-black leading-none tracking-[-0.045em] text-brand-ink sm:text-[36px]">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
