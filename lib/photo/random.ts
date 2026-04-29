import {
  ASPECT_RATIOS,
  LIGHTING,
  MOODS,
  SCENARIOS,
  SUBJECTS,
  SURFACES,
  type PhotoState,
} from "./types";

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function randomState(_prev: PhotoState): PhotoState {
  return {
    scenario: pick(SCENARIOS),
    mood: pick(MOODS),
    subject: pick(SUBJECTS),
    surface: pick(SURFACES),
    lighting: pick(LIGHTING),
    aspect: pick(ASPECT_RATIOS),
    hasModel: Math.random() > 0.5,
    seed: Math.floor(Math.random() * 9999),
  };
}
