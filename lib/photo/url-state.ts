import {
  ASPECT_RATIOS,
  DEFAULT_STATE,
  LIGHTING,
  MOODS,
  SCENARIOS,
  SUBJECTS,
  SURFACES,
  type AspectRatio,
  type Lighting,
  type Mood,
  type PhotoState,
  type Scenario,
  type Subject,
  type Surface,
} from "./types";

const idxOrDefault = <T extends string>(
  list: readonly T[],
  raw: string | null,
  fallback: T,
): T => {
  if (!raw) return fallback;
  const n = Number(raw);
  if (Number.isInteger(n) && n >= 0 && n < list.length) return list[n];
  return list.includes(raw as T) ? (raw as T) : fallback;
};

export function encodeState(s: PhotoState): string {
  const params = new URLSearchParams({
    sc: SCENARIOS.indexOf(s.scenario).toString(),
    mo: MOODS.indexOf(s.mood).toString(),
    su: SUBJECTS.indexOf(s.subject).toString(),
    sf: SURFACES.indexOf(s.surface).toString(),
    li: LIGHTING.indexOf(s.lighting).toString(),
    ar: ASPECT_RATIOS.indexOf(s.aspect).toString(),
    hm: s.hasModel ? "1" : "0",
    x: s.seed.toString(),
  });
  return params.toString();
}

export function decodeState(qs: string | URLSearchParams): PhotoState {
  const params = typeof qs === "string" ? new URLSearchParams(qs) : qs;
  const x = params.get("x");

  return {
    scenario: idxOrDefault<Scenario>(SCENARIOS, params.get("sc"), DEFAULT_STATE.scenario),
    mood: idxOrDefault<Mood>(MOODS, params.get("mo"), DEFAULT_STATE.mood),
    subject: idxOrDefault<Subject>(SUBJECTS, params.get("su"), DEFAULT_STATE.subject),
    surface: idxOrDefault<Surface>(SURFACES, params.get("sf"), DEFAULT_STATE.surface),
    lighting: idxOrDefault<Lighting>(LIGHTING, params.get("li"), DEFAULT_STATE.lighting),
    aspect: idxOrDefault<AspectRatio>(ASPECT_RATIOS, params.get("ar"), DEFAULT_STATE.aspect),
    hasModel: params.get("hm") === "1",
    seed: x ? Math.max(0, Math.min(9999, Number(x) | 0)) : DEFAULT_STATE.seed,
  };
}
