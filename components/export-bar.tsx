"use client";

import { useState } from "react";
import { Copy, FileText, Link2, Check, Tag as TagIcon } from "lucide-react";
import { buildPhotoPrompt } from "@/lib/photo/prompt-builder";
import { buildListing } from "@/lib/photo/listing-builder";
import { encodeState } from "@/lib/photo/url-state";
import type { PhotoState } from "@/lib/photo/types";
import { BrandButton } from "./brand-button";

interface Props {
  state: PhotoState;
}

type Status = "idle" | "working" | "done" | "error";

export function ExportBar({ state }: Props) {
  const [promptStatus, setPromptStatus] = useState<Status>("idle");
  const [listingStatus, setListingStatus] = useState<Status>("idle");
  const [tagsStatus, setTagsStatus] = useState<Status>("idle");
  const [shareStatus, setShareStatus] = useState<Status>("idle");

  async function withStatus(setter: (s: Status) => void, fn: () => Promise<void> | void) {
    setter("working");
    try {
      await fn();
      setter("done");
      setTimeout(() => setter("idle"), 1600);
    } catch (e) {
      console.error(e);
      setter("error");
      setTimeout(() => setter("idle"), 2400);
    }
  }

  const handleCopyPrompt = () =>
    withStatus(setPromptStatus, async () => {
      const p = buildPhotoPrompt(state);
      await navigator.clipboard.writeText(`${p.full}\n\n--- Negative ---\n${p.negative}`);
    });

  const handleCopyListing = () =>
    withStatus(setListingStatus, async () => {
      const listing = buildListing(state);
      await navigator.clipboard.writeText(listing.asMarkdown);
    });

  const handleCopyTags = () =>
    withStatus(setTagsStatus, async () => {
      const listing = buildListing(state);
      await navigator.clipboard.writeText(listing.tags.join(", "));
    });

  const handleShare = () =>
    withStatus(setShareStatus, async () => {
      const qs = encodeState(state);
      const url = `${window.location.origin}${window.location.pathname}?${qs}`;
      window.history.replaceState({}, "", `?${qs}`);
      await navigator.clipboard.writeText(url);
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <BrandButton variant="gold" onClick={handleCopyPrompt} disabled={promptStatus === "working"}>
        <StatusLine status={promptStatus} icon={<Copy className="h-4 w-4" />} idleLabel="Copy AI prompt" doneLabel="Copied" />
      </BrandButton>

      <BrandButton variant="outline" onClick={handleCopyListing} disabled={listingStatus === "working"}>
        <StatusLine status={listingStatus} icon={<FileText className="h-4 w-4" />} idleLabel="Copy stock listing" doneLabel="Copied" />
      </BrandButton>

      <BrandButton variant="outline" onClick={handleCopyTags} disabled={tagsStatus === "working"}>
        <StatusLine status={tagsStatus} icon={<TagIcon className="h-4 w-4" />} idleLabel="Tags" doneLabel="Copied" />
      </BrandButton>

      <BrandButton variant="ghost" onClick={handleShare} disabled={shareStatus === "working"}>
        <StatusLine status={shareStatus} icon={<Link2 className="h-4 w-4" />} idleLabel="Copy link" doneLabel="Copied" />
      </BrandButton>
    </div>
  );
}

function StatusLine({
  status,
  icon,
  idleLabel,
  doneLabel = "Saved",
}: {
  status: Status;
  icon: React.ReactNode;
  idleLabel: string;
  doneLabel?: string;
}) {
  if (status === "working") {
    return (
      <>
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Working…</span>
      </>
    );
  }
  if (status === "done") {
    return (
      <>
        <Check className="h-4 w-4" />
        <span>{doneLabel}</span>
      </>
    );
  }
  if (status === "error") {
    return (
      <>
        {icon}
        <span>Try again</span>
      </>
    );
  }
  return (
    <>
      {icon}
      <span>{idleLabel}</span>
    </>
  );
}
