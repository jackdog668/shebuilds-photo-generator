"use client";

import { PRESETS } from "@/lib/photo/presets";
import { isSameState } from "@/lib/photo/favorites";
import type { PhotoState } from "@/lib/photo/types";
import { cn } from "@/lib/cn";

interface Props {
  current: PhotoState;
  onSelect: (state: PhotoState) => void;
}

export function PresetRail({ current, onSelect }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="label">Curated</h3>
        <span className="font-mono text-[10px] text-cream-muted/60">One-tap presets</span>
      </div>
      <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
        <div className="flex gap-2 lg:flex-wrap">
          {PRESETS.map((preset) => {
            const active = isSameState(current, preset.state);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelect(preset.state)}
                aria-pressed={active}
                title={preset.useCase}
                className={cn(
                  "flex flex-shrink-0 flex-col items-start rounded-lg border px-3.5 py-2 text-xs transition-all",
                  active
                    ? "border-gold/60 bg-gold/10 text-cream"
                    : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
                )}
              >
                <span className="font-display tracking-tight">{preset.name}</span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-cream-muted/60">
                  {preset.useCase}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
