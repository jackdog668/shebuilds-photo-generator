export const SCENARIOS = [
  "flat-lay",
  "lifestyle",
  "hero-shot",
  "social-square",
  "pin-vertical",
] as const;
export type Scenario = (typeof SCENARIOS)[number];

export const MOODS = [
  "warm-cozy",
  "minimal-clean",
  "cottagecore",
  "y2k-bright",
  "dark-academia",
  "golden-hour",
  "rainy-day",
  "studio-clean",
] as const;
export type Mood = (typeof MOODS)[number];

export const SUBJECTS = [
  "planner",
  "journal",
  "iphone-screen",
  "ipad",
  "laptop",
  "greeting-card",
  "mug",
  "sticker-sheet",
  "art-print",
  "ebook-cover",
  "tote-bag",
  "none",
] as const;
export type Subject = (typeof SUBJECTS)[number];

export const SURFACES = [
  "wood",
  "linen",
  "marble",
  "desk",
  "bed",
  "cafe-table",
  "grass",
  "sand",
] as const;
export type Surface = (typeof SURFACES)[number];

export const LIGHTING = [
  "morning-soft",
  "golden-hour",
  "overcast",
  "studio",
  "candlelit",
  "window-natural",
] as const;
export type Lighting = (typeof LIGHTING)[number];

export const ASPECT_RATIOS = [
  "1:1",
  "4:5",
  "16:9",
  "2:3",
  "3:4",
] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export interface PhotoState {
  scenario: Scenario;
  mood: Mood;
  subject: Subject;
  surface: Surface;
  lighting: Lighting;
  aspect: AspectRatio;
  hasModel: boolean;
  seed: number;
}

export const SCENARIO_LABELS: Record<Scenario, string> = {
  "flat-lay": "Flat lay",
  lifestyle: "Lifestyle",
  "hero-shot": "Hero shot",
  "social-square": "Social square",
  "pin-vertical": "Pin vertical",
};

export const SCENARIO_DESCRIPTIONS: Record<Scenario, string> = {
  "flat-lay": "Top-down view, styled props, magazine-spread feel.",
  lifestyle: "Eye-level, in-the-moment, hands or body partially in frame.",
  "hero-shot": "Cinematic wide angle. Course banners, landing pages.",
  "social-square": "Centered, balanced for IG and Etsy listing main image.",
  "pin-vertical": "Tall composition for Pinterest discovery.",
};

export const MOOD_LABELS: Record<Mood, string> = {
  "warm-cozy": "Warm & Cozy",
  "minimal-clean": "Minimal Clean",
  cottagecore: "Cottagecore",
  "y2k-bright": "Y2K Bright",
  "dark-academia": "Dark Academia",
  "golden-hour": "Golden Hour",
  "rainy-day": "Rainy Day",
  "studio-clean": "Studio Clean",
};

export const MOOD_DESCRIPTIONS: Record<Mood, string> = {
  "warm-cozy": "Cream cardigan tones, latte steam, slow morning energy.",
  "minimal-clean": "White surfaces, single accent, generous negative space.",
  cottagecore: "Linen apron, pressed flowers, honey-light, garden window.",
  "y2k-bright": "Holographic gloss, butterfly clips, bright pop palette.",
  "dark-academia": "Tweed, candle, leather-bound books, oxblood and ink.",
  "golden-hour": "Late-day glow, lens flare, warm shadows.",
  "rainy-day": "Cafe window, soft fog, jazz-club blues, cozy moodboard.",
  "studio-clean": "Even softbox, neutral backdrop, e-commerce sharp.",
};

export const SUBJECT_LABELS: Record<Subject, string> = {
  planner: "Planner",
  journal: "Journal",
  "iphone-screen": "iPhone screen",
  ipad: "iPad",
  laptop: "Laptop",
  "greeting-card": "Greeting card",
  mug: "Mug",
  "sticker-sheet": "Sticker sheet",
  "art-print": "Art print",
  "ebook-cover": "Ebook cover",
  "tote-bag": "Tote bag",
  none: "None (pure scene)",
};

export const SURFACE_LABELS: Record<Surface, string> = {
  wood: "Wood",
  linen: "Linen",
  marble: "Marble",
  desk: "Desk",
  bed: "Bed (made)",
  "cafe-table": "Café table",
  grass: "Grass",
  sand: "Sand",
};

export const LIGHTING_LABELS: Record<Lighting, string> = {
  "morning-soft": "Morning soft",
  "golden-hour": "Golden hour",
  overcast: "Overcast",
  studio: "Studio softbox",
  candlelit: "Candlelit",
  "window-natural": "Window natural",
};

export const ASPECT_LABELS: Record<AspectRatio, string> = {
  "1:1": "1:1 · Etsy main / IG post",
  "4:5": "4:5 · IG / Pin",
  "16:9": "16:9 · Hero banner",
  "2:3": "2:3 · Pin tall",
  "3:4": "3:4 · KDP cover",
};

export const ASPECT_CLASSES: Record<AspectRatio, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-[16/9]",
  "2:3": "aspect-[2/3]",
  "3:4": "aspect-[3/4]",
};

export const DEFAULT_STATE: PhotoState = {
  scenario: "flat-lay",
  mood: "warm-cozy",
  subject: "journal",
  surface: "linen",
  lighting: "morning-soft",
  aspect: "1:1",
  hasModel: false,
  seed: 1234,
};
