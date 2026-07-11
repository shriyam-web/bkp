/** White bg · black political symbols only · scattered */

const POLITICAL_SYMBOLS = [
  '☭', // hammer & sickle — Marxwaad
  '☸', // Dhamma chakra — Ambedkarwaad
  '⚑', // party flag
  '⚖', // justice / equality
] as const;

function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const COUNT = 90;

const SCATTER = Array.from({ length: COUNT }, (_, i) => {
  const symbol =
    POLITICAL_SYMBOLS[Math.floor(seeded(i) * POLITICAL_SYMBOLS.length)];
  return {
    symbol,
    left: seeded(i + 1) * 100,
    top: seeded(i + 2) * 100,
    rotate: seeded(i + 3) * 70 - 35,
    size: 0.85 + seeded(i + 4) * 1.15,
    opacity: 0.07 + seeded(i + 5) * 0.1,
  };
});

export function AdminPoliticalBackdrop({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none bg-white ${className}`}
      aria-hidden
    >
      {SCATTER.map((mark, i) => (
        <span
          key={i}
          className="absolute leading-none text-black"
          style={{
            left: `${mark.left}%`,
            top: `${mark.top}%`,
            fontSize: `${mark.size}rem`,
            opacity: mark.opacity,
            transform: `translate(-50%, -50%) rotate(${mark.rotate}deg)`,
          }}
        >
          {mark.symbol}
        </span>
      ))}
    </div>
  );
}
