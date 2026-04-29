import {
  ASPECT_LABELS,
  LIGHTING_LABELS,
  MOOD_DESCRIPTIONS,
  MOOD_LABELS,
  SCENARIO_DESCRIPTIONS,
  SCENARIO_LABELS,
  SUBJECT_LABELS,
  SURFACE_LABELS,
  type PhotoState,
} from "./types";

export interface BuiltPhotoPrompt {
  short: string;
  full: string;
  negative: string;
}

const NEGATIVE =
  "no text on objects, no logos, no watermarks, no real recognizable faces, no extra fingers or limbs, no jpeg artifacts, no cartoon, no illustration, no AI artifacts, no harsh blur except intentional bokeh, no oversaturated colors";

const SUBJECT_DETAIL: Record<string, string> = {
  planner: "an open hardcover undated planner with subtle dot grid, premium paper, blank pages",
  journal: "a leather-bound journal, cream linen-textured paper, slightly opened, with a brass pen beside it",
  "iphone-screen": "a modern smartphone with a clean blank screen, ready for an app mockup overlay",
  ipad: "a 12.9-inch tablet with a blank pure-white screen, ready for design mockup overlay",
  laptop: "a thin silver laptop with a clean blank screen, ready for course or product overlay",
  "greeting-card": "a folded greeting card with a blank cream interior, no printed text",
  mug: "a matte ceramic mug with a clean blank wraparound surface, ready for design mockup",
  "sticker-sheet": "a kiss-cut sticker sheet on backing paper, multiple coordinated stickers, slight curl on a corner",
  "art-print": "a matte 8x10 art print with thick edges, blank, ready for artwork overlay",
  "ebook-cover": "a vertical ebook cover propped on a small easel, blank front, ready for design mockup",
  "tote-bag": "a natural canvas tote bag laid flat, blank panel, ready for design mockup",
  none: "no central product, pure styled scene",
};

export function buildPhotoPrompt(state: PhotoState): BuiltPhotoPrompt {
  const scenario = SCENARIO_LABELS[state.scenario];
  const mood = MOOD_LABELS[state.mood];
  const moodDesc = MOOD_DESCRIPTIONS[state.mood];
  const surface = SURFACE_LABELS[state.surface].toLowerCase();
  const lighting = LIGHTING_LABELS[state.lighting].toLowerCase();
  const subjectDetail = SUBJECT_DETAIL[state.subject] ?? "no central product, pure styled scene";
  const aspectLabel = ASPECT_LABELS[state.aspect];
  const modelBit = state.hasModel
    ? "Include a woman's hand or partial figure interacting naturally with the scene — no recognizable face."
    : "No people in frame.";

  const short = `${mood} ${scenario.toLowerCase()} of ${SUBJECT_LABELS[state.subject].toLowerCase()} on ${surface}.`;

  const full = [
    `Photography mockup for digital product marketing.`,
    `Composition: ${scenario} — ${SCENARIO_DESCRIPTIONS[state.scenario]}`,
    `Mood: ${mood} — ${moodDesc}`,
    `Subject: ${subjectDetail}.`,
    `Surface: styled ${surface} surface with tasteful complementary props (e.g. dried flowers, ceramic vase, linen napkin) that match the mood.`,
    `Lighting: ${lighting}, soft directional, photographic.`,
    `Camera: 50mm prime, f/2.8, shallow depth of field, professional product photography quality.`,
    modelBit,
    `Aspect ratio: ${state.aspect} (${aspectLabel.split("·")[1]?.trim() ?? aspectLabel}).`,
    `Photorealistic, high detail, magazine-ready, sharp focus on subject, soft bokeh on background.`,
  ].join(" ");

  return { short, full, negative: NEGATIVE };
}
