"use client";

import clsx from "clsx";

interface StatusIndicator {
  label: string;
  active: boolean;
}

interface FaceStatusBarProps {
  message?: string;
  statusIndicators: StatusIndicator[];
}

export function FaceStatusBar({
  message,
  statusIndicators,
}: FaceStatusBarProps) {
  const hasMessage = Boolean(message);

  return (
    <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col gap-4 px-6 pb-2">
      {hasMessage && (
        <div className="pointer-events-auto flex justify-center">
          <div className="rounded-2xl bg-black/70 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-black/40">
            {message}
          </div>
        </div>
      )}
      <div className="pointer-events-auto flex flex-wrap justify-center gap-4">
        {statusIndicators.map((indicator) => (
          <StatusCard
            key={indicator.label}
            label={indicator.label}
            active={indicator.active}
          />
        ))}
      </div>
    </div>
  );
}

function StatusCard({ label, active }: StatusIndicator) {
  return (
    <div
      className={clsx(
        "rounded-2xl border px-4 py-4 text-base font-medium",
        active
          ? "border-green-400/70 bg-green-400/15 text-green-200"
          : "border-white/20 bg-white/5 text-white/60"
      )}
    >
      {label}
    </div>
  );
}
