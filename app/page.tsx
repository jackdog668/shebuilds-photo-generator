"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { ControlPanel } from "@/components/control-panel";
import { PhotoPreview } from "@/components/photo-preview";
import { PresetRail } from "@/components/preset-rail";
import { FavoritesRail } from "@/components/favorites-rail";
import { ExportBar } from "@/components/export-bar";
import { DEFAULT_STATE, type PhotoState } from "@/lib/photo/types";
import { decodeState, encodeState } from "@/lib/photo/url-state";
import { randomState } from "@/lib/photo/random";
import { brand } from "@/lib/brand";

export default function Page() {
  const [state, setState] = useState<PhotoState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) setState(decodeState(params));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    let raf = 0;
    raf = requestAnimationFrame(() => {
      const qs = encodeState(state);
      if (window.location.search !== `?${qs}`) {
        window.history.replaceState({}, "", `${window.location.pathname}?${qs}`);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [state, hydrated]);

  const handleRandom = useCallback(() => {
    setState((prev) => randomState(prev));
  }, []);

  return (
    <>
      <Header />

      <section className="mx-auto max-w-[1600px] px-6 pt-10 pb-6 lg:px-10">
        <p className="label mb-3">Toolkit · 05</p>
        <h1 className="font-display text-display-lg leading-[0.95] tracking-tight">
          <span className="text-foil">Mockups</span>{" "}
          <em className="font-display font-light italic text-cream-muted">that sell the listing</em>.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream-muted">
          {brand.subTagline} Pick the composition, mood, subject, and aspect —
          paste the prompt into your AI tool or hit Generate for an instant
          AI mockup. Etsy hero images, IG posts, Pin tall, course banners.
          Free, forever.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16 lg:px-10">
        <div className="mb-6">
          <PresetRail current={state} onSelect={setState} />
        </div>

        <div className="mb-6">
          <FavoritesRail current={state} onSelect={setState} />
        </div>

        <div className="gold-rule mb-8" />

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-lg border border-cream/[0.06] bg-surface/40 p-6 backdrop-blur-sm lg:sticky lg:top-6">
              <ControlPanel state={state} onChange={setState} onRandom={handleRandom} />
            </div>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="paper rounded-lg border border-cream/[0.06] p-6 lg:p-10">
              <div className="mx-auto max-w-2xl">
                <PhotoPreview state={state} />
              </div>

              <div className="gold-rule mt-10 mb-6" />

              <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="label mb-1">Export</p>
                  <p className="text-sm text-cream-muted">
                    Copy the AI prompt for unlimited use · grab a stock-photo
                    listing draft for Etsy/Creative Market · share the scene
                    setup by URL.
                  </p>
                </div>
                <ExportBar state={state} />
              </div>
            </div>

            <p className="mt-6 text-center font-mono text-[11px] tracking-wider text-cream-muted/60">
              Made by SheBuilds Digital · Free, forever ·{" "}
              <a
                href={brand.links.school}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-light"
              >
                Join the School · $33/mo ↗
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
