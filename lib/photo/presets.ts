import type { PhotoState } from "./types";

export interface Preset {
  id: string;
  name: string;
  state: PhotoState;
  /** What it's optimized for — shows in the UI */
  useCase: string;
}

export const PRESETS: Preset[] = [
  {
    id: "etsy-hero",
    name: "Etsy Hero",
    useCase: "Etsy listing main image",
    state: {
      scenario: "flat-lay",
      mood: "warm-cozy",
      subject: "sticker-sheet",
      surface: "marble",
      lighting: "golden-hour",
      aspect: "1:1",
      hasModel: false,
      seed: 1234,
    },
  },
  {
    id: "ig-post",
    name: "IG Post",
    useCase: "Instagram feed / IG Post",
    state: {
      scenario: "lifestyle",
      mood: "cottagecore",
      subject: "journal",
      surface: "linen",
      lighting: "window-natural",
      aspect: "4:5",
      hasModel: true,
      seed: 4242,
    },
  },
  {
    id: "pin-tall",
    name: "Pin Tall",
    useCase: "Pinterest vertical pin",
    state: {
      scenario: "pin-vertical",
      mood: "cottagecore",
      subject: "journal",
      surface: "wood",
      lighting: "morning-soft",
      aspect: "2:3",
      hasModel: false,
      seed: 7321,
    },
  },
  {
    id: "course-banner",
    name: "Course Banner",
    useCase: "Landing page hero / course header",
    state: {
      scenario: "hero-shot",
      mood: "dark-academia",
      subject: "laptop",
      surface: "desk",
      lighting: "candlelit",
      aspect: "16:9",
      hasModel: false,
      seed: 909,
    },
  },
  {
    id: "mug-mockup",
    name: "Mug Mockup",
    useCase: "Print-on-demand mug listing",
    state: {
      scenario: "flat-lay",
      mood: "warm-cozy",
      subject: "mug",
      surface: "wood",
      lighting: "golden-hour",
      aspect: "1:1",
      hasModel: false,
      seed: 808,
    },
  },
  {
    id: "ebook-cover",
    name: "Ebook Cover",
    useCase: "Payhip / Gumroad ebook listing",
    state: {
      scenario: "hero-shot",
      mood: "minimal-clean",
      subject: "ebook-cover",
      surface: "marble",
      lighting: "studio",
      aspect: "3:4",
      hasModel: false,
      seed: 2412,
    },
  },
  {
    id: "morning-ritual",
    name: "Morning Ritual",
    useCase: "Slow-living blog hero",
    state: {
      scenario: "lifestyle",
      mood: "warm-cozy",
      subject: "mug",
      surface: "bed",
      lighting: "morning-soft",
      aspect: "4:5",
      hasModel: true,
      seed: 1212,
    },
  },
  {
    id: "rainy-cafe",
    name: "Rainy Café",
    useCase: "Mood board / Pinterest aesthetic",
    state: {
      scenario: "lifestyle",
      mood: "rainy-day",
      subject: "journal",
      surface: "cafe-table",
      lighting: "window-natural",
      aspect: "4:5",
      hasModel: true,
      seed: 1999,
    },
  },
];
