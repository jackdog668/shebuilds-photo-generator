"use client";

import { Shuffle } from "lucide-react";
import {
  ASPECT_LABELS,
  ASPECT_RATIOS,
  LIGHTING,
  LIGHTING_LABELS,
  MOOD_DESCRIPTIONS,
  MOOD_LABELS,
  MOODS,
  SCENARIO_DESCRIPTIONS,
  SCENARIO_LABELS,
  SCENARIOS,
  SUBJECTS,
  SUBJECT_LABELS,
  SURFACES,
  SURFACE_LABELS,
  type AspectRatio,
  type Lighting,
  type Mood,
  type PhotoState,
  type Scenario,
  type Subject,
  type Surface,
} from "@/lib/photo/types";
import { cn } from "@/lib/cn";

interface Props {
  state: PhotoState;
  onChange: (next: PhotoState) => void;
  onRandom: () => void;
}

export function ControlPanel({ state, onChange, onRandom }: Props) {
  const set = <K extends keyof PhotoState>(key: K, value: PhotoState[K]) =>
    onChange({ ...state, [key]: value });

  return (
    <div className="space-y-8">
      <Section label="Composition">
        <div className="grid grid-cols-1 gap-1.5">
          {SCENARIOS.map((s) => (
            <Chip
              key={s}
              active={state.scenario === s}
              onClick={() => set("scenario", s as Scenario)}
              label={SCENARIO_LABELS[s]}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted">
          {SCENARIO_DESCRIPTIONS[state.scenario]}
        </p>
      </Section>

      <Section label="Mood">
        <div className="grid grid-cols-2 gap-1.5">
          {MOODS.map((m) => (
            <Chip
              key={m}
              active={state.mood === m}
              onClick={() => set("mood", m as Mood)}
              label={MOOD_LABELS[m]}
              size="sm"
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted">
          {MOOD_DESCRIPTIONS[state.mood]}
        </p>
      </Section>

      <Section label="Subject">
        <div className="grid grid-cols-2 gap-1.5">
          {SUBJECTS.map((s) => (
            <Chip
              key={s}
              active={state.subject === s}
              onClick={() => set("subject", s as Subject)}
              label={SUBJECT_LABELS[s]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Surface">
        <div className="grid grid-cols-2 gap-1.5">
          {SURFACES.map((s) => (
            <Chip
              key={s}
              active={state.surface === s}
              onClick={() => set("surface", s as Surface)}
              label={SURFACE_LABELS[s]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Lighting">
        <div className="grid grid-cols-2 gap-1.5">
          {LIGHTING.map((l) => (
            <Chip
              key={l}
              active={state.lighting === l}
              onClick={() => set("lighting", l as Lighting)}
              label={LIGHTING_LABELS[l]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Aspect ratio">
        <div className="grid grid-cols-1 gap-1.5">
          {ASPECT_RATIOS.map((a) => (
            <Chip
              key={a}
              active={state.aspect === a}
              onClick={() => set("aspect", a as AspectRatio)}
              label={ASPECT_LABELS[a]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Model">
        <button
          type="button"
          onClick={() => set("hasModel", !state.hasModel)}
          className={cn(
            "flex w-full items-center justify-between rounded-md border px-3 py-2.5 transition-all",
            state.hasModel
              ? "border-gold/60 bg-gold/10 text-cream"
              : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
          )}
        >
          <span className="font-display text-sm leading-tight">Hands / partial figure in shot</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
            {state.hasModel ? "On" : "Off"}
          </span>
        </button>
      </Section>

      <button
        type="button"
        onClick={onRandom}
        className="group flex w-full items-center justify-between rounded-full border border-cream/15 px-5 py-3 text-sm transition-all hover:border-gold/60 hover:bg-gold/5"
      >
        <span className="font-mono uppercase tracking-[0.16em] text-[11px] text-cream-muted group-hover:text-cream">
          Surprise me
        </span>
        <Shuffle className="h-4 w-4 text-gold transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label mb-3">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border text-left transition-all",
        size === "sm" ? "px-3 py-2 text-[12px]" : "px-3 py-2.5 text-sm",
        active
          ? "border-gold/60 bg-gold/10 text-cream shadow-gold-soft"
          : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
      )}
    >
      <div className={cn("font-display leading-tight", size === "sm" ? "text-sm" : "text-base")}>
        {label}
      </div>
    </button>
  );
}
