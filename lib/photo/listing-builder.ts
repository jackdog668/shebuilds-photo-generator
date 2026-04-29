import {
  ASPECT_LABELS,
  MOOD_LABELS,
  SUBJECT_LABELS,
  type PhotoState,
} from "./types";

export interface BuiltListing {
  title: string;
  description: string;
  tags: string[];
  asMarkdown: string;
}

/**
 * Crafts a listing draft for selling stock-style mockups on Etsy/Creative Market.
 * Title ≤ 140 chars (Etsy), tags ≤ 13 (Etsy), each tag ≤ 20 chars.
 */
export function buildListing(state: PhotoState): BuiltListing {
  const mood = MOOD_LABELS[state.mood];
  const subject = SUBJECT_LABELS[state.subject];
  const aspectLabel = ASPECT_LABELS[state.aspect].split("·")[0].trim();

  const title =
    `${mood} ${subject} Mockup | Stock Photo for Digital Sellers | ` +
    `${aspectLabel} Aspect | High-Res JPG Download`;

  const description = [
    `${mood.toUpperCase()} ${subject.toUpperCase()} MOCKUP — A high-resolution stock-style photograph for your Etsy listings, Pinterest pins, and Instagram feed.`,
    ``,
    `WHAT'S INCLUDED`,
    `• High-resolution JPG (300 dpi where applicable)`,
    `• ${aspectLabel} aspect ratio — sized for ${aspectFitDescription(state.aspect)}`,
    `• Royalty-free for use in your digital product listings, blog posts, and social media`,
    `• Personal + small commercial license`,
    ``,
    `PERFECT FOR`,
    `• Etsy printable shop hero images`,
    `• Pinterest pins promoting digital products`,
    `• Instagram feed and reels covers`,
    `• Course landing pages and ebook covers`,
    `• Blog post hero images`,
    ``,
    `INSTANT DOWNLOAD — files available the moment you check out. No physical product will be shipped.`,
    ``,
    `Made with care by SheBuilds Digital. See more tools at shebuildsdigital.com.`,
  ].join("\n");

  const baseTags = [
    `${state.mood.replace(/-/g, " ")} mockup`,
    `${state.subject.replace(/-/g, " ")} stock`,
    "stock photography",
    "etsy listing photo",
    "pinterest pin photo",
    `${aspectLabel.toLowerCase()} mockup`,
    "digital product mockup",
    "instant download",
    "lifestyle photography",
    "flat lay photo",
    "social media stock",
    "course banner image",
    "small commercial",
  ]
    .map((t) => t.toLowerCase())
    .map((t) => (t.length > 20 ? t.slice(0, 20).trim() : t));

  const tags = Array.from(new Set(baseTags)).slice(0, 13);

  const asMarkdown =
    `# ${title}\n\n` +
    `**Tags:** ${tags.join(", ")}\n\n` +
    `${description}`;

  return { title, description, tags, asMarkdown };
}

function aspectFitDescription(ar: string): string {
  switch (ar) {
    case "1:1":
      return "Etsy listing main, IG square posts";
    case "4:5":
      return "IG feed posts, Pinterest pins";
    case "16:9":
      return "course landing pages, hero banners";
    case "2:3":
      return "Pinterest tall pins";
    case "3:4":
      return "KDP and ebook cover layouts";
    default:
      return "general digital marketing";
  }
}
