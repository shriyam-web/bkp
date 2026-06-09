interface PageIntroProps {
  title: string;
  subtitle: string;
  description?: string;
  count?: number;
  countLabel?: string;
}

export default function PageIntro({
  title,
  subtitle,
  description,
  count,
  countLabel,
}: PageIntroProps) {
  return (
    <section className="border-b border-border bg-background pt-28 pb-10">
      <div className="h-1 bg-red-600" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600 mb-2">
              {subtitle}
            </p>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {count !== undefined && countLabel && (
            <div className="flex items-baseline gap-2 border border-border rounded-md px-4 py-3 bg-muted/40 shrink-0">
              <span className="text-2xl font-bold text-foreground tabular-nums">{count}</span>
              <span className="text-sm text-muted-foreground">{countLabel}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
