"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, AlertTriangle, Camera } from "lucide-react";
import { buildPhotoPrompt } from "@/lib/photo/prompt-builder";
import { ASPECT_CLASSES, MOOD_LABELS, type PhotoState } from "@/lib/photo/types";
import { cn } from "@/lib/cn";

interface Props {
  state: PhotoState;
}

interface GenerateResult {
  status: "idle" | "loading" | "success" | "error";
  image?: string;
  error?: string;
  remaining?: number;
}

const MOOD_GRADIENTS: Record<string, string> = {
  "warm-cozy": "from-rose-200/30 via-amber-100/20 to-cream/40",
  "minimal-clean": "from-cream/60 via-white/30 to-cream/40",
  cottagecore: "from-emerald-200/30 via-amber-100/30 to-cream/40",
  "y2k-bright": "from-purple-300/30 via-pink-200/30 to-cyan-200/30",
  "dark-academia": "from-amber-900/40 via-stone-800/40 to-stone-900/40",
  "golden-hour": "from-amber-300/40 via-orange-200/30 to-rose-200/30",
  "rainy-day": "from-slate-400/30 via-blue-300/20 to-slate-300/30",
  "studio-clean": "from-cream/50 via-white/40 to-cream/40",
};

export function PhotoPreview({ state }: Props) {
  const [result, setResult] = useState<GenerateResult>({ status: "idle" });
  const prompt = useMemo(() => buildPhotoPrompt(state), [state]);
  const aspectClass = ASPECT_CLASSES[state.aspect];

  const handleGenerate = async () => {
    setResult({ status: "loading" });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.full, negative: prompt.negative }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ status: "error", error: data.error ?? "Generation failed.", remaining: data.remaining });
        return;
      }
      setResult({ status: "success", image: data.image, remaining: data.remaining });
    } catch (e) {
      console.error(e);
      setResult({ status: "error", error: "Network error. Try the copy-prompt path." });
    }
  };

  const handleDownload = () => {
    if (!result.image) return;
    const a = document.createElement("a");
    a.href = result.image;
    a.download = `shebuilds-photo-${state.scenario}-${state.mood}-${state.seed}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div>
      <motion.div
        key={`${state.mood}-${state.scenario}-${state.aspect}-${result.status}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative w-full overflow-hidden rounded-md shadow-elevated ring-1 ring-cream/10",
          aspectClass,
        )}
        aria-label={`${MOOD_LABELS[state.mood]} photo preview`}
      >
        <CornerBrackets />

        {result.status === "success" && result.image ? (
          <img src={result.image} alt={`Generated ${MOOD_LABELS[state.mood]} photo mockup`} className="h-full w-full object-cover" />
        ) : (
          <PlaceholderScene state={state} />
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md bg-bg/70 px-3 py-2 backdrop-blur-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-muted">
            {result.status === "success" ? "AI-generated · ready to download" : `${state.aspect} · vibe preview`}
          </p>
          {typeof result.remaining === "number" && (
            <span className="font-mono text-[10px] text-gold">{result.remaining} left this hour</span>
          )}
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={result.status === "loading"}
          className="group inline-flex items-center gap-2 rounded-full bg-gold-shimmer bg-[length:200%_200%] px-5 py-2.5 text-sm font-medium text-ink shadow-gold-soft transition-all hover:shadow-gold hover:bg-[position:100%_50%] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {result.status === "loading" ? (
            <>
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-ink border-t-transparent" />
              Composing…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Generate with AI
            </>
          )}
        </button>

        {result.status === "success" && (
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-cream transition-all hover:border-gold hover:bg-gold/5"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        )}
      </div>

      {result.status === "error" && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-rose-300/30 bg-rose-300/5 px-4 py-3 text-sm text-cream">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-300" />
          <span>{result.error}</span>
        </div>
      )}

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted/70">
        Free tier: 5 AI generations per hour. Copy the prompt instead for unlimited use in your own AI tool.
      </p>
    </div>
  );
}

function PlaceholderScene({ state }: { state: PhotoState }) {
  const gradient = MOOD_GRADIENTS[state.mood] ?? "from-cream/40 via-cream/30 to-cream/40";
  return (
    <div className={cn("relative h-full w-full bg-gradient-to-br", gradient)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <Camera className="h-10 w-10 text-cream/60" strokeWidth={1.25} />
        <p className="font-display text-lg leading-tight tracking-tight text-cream">
          Tap <span className="text-foil">Generate</span> to compose your scene.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-muted">
          Or copy the prompt below for your own AI tool.
        </p>
      </div>
    </div>
  );
}

function CornerBrackets() {
  const arm = "absolute h-4 w-4 border-gold pointer-events-none z-10";
  return (
    <>
      <span className={`${arm} top-2 left-2 border-t border-l`} />
      <span className={`${arm} top-2 right-2 border-t border-r`} />
      <span className={`${arm} bottom-2 left-2 border-b border-l`} />
      <span className={`${arm} bottom-2 right-2 border-b border-r`} />
    </>
  );
}
