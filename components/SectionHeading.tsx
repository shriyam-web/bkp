interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
