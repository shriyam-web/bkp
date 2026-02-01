'use client';

import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200/50", className)}
      {...props}
    />
  );
}

export function PremiumLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-blue-600 border-b-transparent animate-spin-slow"></div>
      </div>
      <p className="mt-6 text-sm font-bold tracking-widest text-gray-400 uppercase animate-pulse">
        Fetching Leadership Data
      </p>
    </div>
  );
}
