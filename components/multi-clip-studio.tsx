"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Film,
  Play,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StudioMode = "daily" | "review" | "features";

type Theme = "Clean Cut" | "Story Arc" | "Reaction Edit";

type Clip = {
  id: string;
  file: File;
  url: string;
  durationLabel: string;
  sizeLabel: string;
};

const themes: Array<{ id: Theme; caption: string }> = [
  { id: "Clean Cut", caption: "Simple pacing for a polished demo." },
  { id: "Story Arc", caption: "Sharper opening, cleaner ending beat." },
  { id: "Reaction Edit", caption: "Built for side-by-side review energy." },
];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function makeDurationLabel(index: number) {
  const seconds = 8 + index * 4;
  return `00:${seconds.toString().padStart(2, "0")}`;
}

export function MultiClipStudio({
  mode = "daily",
  title,
  intro,
}: {
  mode?: StudioMode;
  title: string;
  intro: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const clipUrlsRef = useRef<string[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<Theme>("Clean Cut");
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [storyCreated, setStoryCreated] = useState(false);

  useEffect(() => {
    clipUrlsRef.current = clips.map((clip) => clip.url);
  }, [clips]);

  useEffect(() => {
    return () => {
      clipUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const featuredClip = clips[currentClipIndex] ?? null;

  const totalDurationLabel = useMemo(() => {
    const totalSeconds = clips.reduce((sum, _, index) => sum + 8 + index * 4, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [clips]);

  const generatedCuts = useMemo(
    () =>
      clips.slice(0, 3).map((clip, index) => ({
        id: clip.id,
        name:
          index === 0
            ? "Hook Cut"
            : index === 1
              ? "Context Cut"
              : "Closer Cut",
        source: clip.file.name,
      })),
    [clips],
  );

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("video/"),
    );

    if (!files.length) {
      return;
    }

    setClips((current) => [
      ...current,
      ...files.map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${current.length + index}`,
        file,
        url: URL.createObjectURL(file),
        durationLabel: makeDurationLabel(current.length + index),
        sizeLabel: formatBytes(file.size),
      })),
    ]);

    setStoryCreated(false);
    event.target.value = "";
  }

  function moveClip(index: number, direction: -1 | 1) {
    setClips((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) {
        return current;
      }

      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];

      if (currentClipIndex === index) {
        setCurrentClipIndex(target);
      } else if (currentClipIndex === target) {
        setCurrentClipIndex(index);
      }

      return next;
    });

    setStoryCreated(false);
  }

  function removeClip(id: string) {
    setClips((current) => {
      const clip = current.find((item) => item.id === id);
      if (clip) {
        URL.revokeObjectURL(clip.url);
      }

      const next = current.filter((item) => item.id !== id);
      setCurrentClipIndex((value) => Math.max(0, Math.min(value, next.length - 1)));
      return next;
    });

    setIsPlayingAll(false);
    setStoryCreated(false);
  }

  function createStory() {
    if (clips.length < 2) {
      return;
    }

    setStoryCreated(true);
    setCurrentClipIndex(0);
    setIsPlayingAll(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => undefined);
    });
  }

  function handleVideoEnded() {
    if (!isPlayingAll || clips.length === 0) {
      return;
    }

    const nextIndex = currentClipIndex + 1;
    if (nextIndex >= clips.length) {
      setIsPlayingAll(false);
      setCurrentClipIndex(0);
      return;
    }

    setCurrentClipIndex(nextIndex);
  }

  useEffect(() => {
    if (!isPlayingAll || !videoRef.current || !featuredClip) {
      return;
    }

    videoRef.current.load();
    videoRef.current.play().catch(() => undefined);
  }, [currentClipIndex, featuredClip, isPlayingAll]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          <div className="border-b border-slate-200 px-6 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-sky-700">Multi-clip studio</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{intro}</p>
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={handleUpload}
              />

              <Button size="lg" onClick={() => inputRef.current?.click()}>
                <Upload className="h-4 w-4" />
                Upload 2+ clips
              </Button>
            </div>
          </div>

          <div className="grid gap-5 p-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border border-slate-200 bg-white",
                    !featuredClip && "flex min-h-[380px] items-center justify-center",
                  )}
                >
                  {featuredClip ? (
                    <div className="relative w-full">
                      <video
                        ref={videoRef}
                        key={featuredClip.id}
                        className="aspect-[4/5] w-full bg-slate-950 object-cover"
                        controls
                        playsInline
                        onEnded={handleVideoEnded}
                      >
                        <source src={featuredClip.url} type={featuredClip.file.type} />
                      </video>
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-950/70 to-transparent px-4 py-4">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-900">
                          {selectedTheme}
                        </span>
                        <span className="text-sm text-white">
                          {currentClipIndex + 1}/{clips.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-8 py-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                        <Film className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-slate-950">
                        Upload a couple clips and make something real
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        The point of this screen is simple: show that the product works, that the
                        edit flow is understandable, and that the builder behind it knows taste.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  {[
                    ["Clips", clips.length.toString().padStart(2, "0")],
                    ["Runtime", totalDurationLabel],
                    ["Mode", selectedTheme],
                    ["Cuts", generatedCuts.length.toString().padStart(2, "0")],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-white p-3">
                      <p className="text-lg font-semibold text-slate-950">{value}</p>
                      <p className="mt-1 text-xs text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Clip order</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Reorder the sequence before creating the stitched result.
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {totalDurationLabel}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {clips.length ? (
                    clips.map((clip, index) => (
                      <div
                        key={clip.id}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3",
                          currentClipIndex === index && "border-sky-200 bg-sky-50",
                        )}
                      >
                        <button
                          type="button"
                          className="relative h-20 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white"
                          onClick={() => {
                            setCurrentClipIndex(index);
                            setIsPlayingAll(false);
                          }}
                        >
                          <video className="h-full w-full object-cover" src={clip.url} muted playsInline />
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">{clip.file.name}</p>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                            <span>{clip.durationLabel}</span>
                            <span>{clip.sizeLabel}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9"
                            onClick={() => moveClip(index, -1)}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9"
                            onClick={() => moveClip(index, 1)}
                            disabled={index === clips.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>

                        <button
                          type="button"
                          className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-white"
                          onClick={() => removeClip(clip.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                      <Sparkles className="mx-auto h-5 w-5 text-slate-400" />
                      <p className="mt-3 text-sm font-medium text-slate-900">No clips yet</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Add two or more clips and this becomes a real editing queue.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Edit mood</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Pick the tone that best sells the demo.
                    </p>
                  </div>
                  <WandSparkles className="h-5 w-5 text-slate-400" />
                </div>

                <div className="mt-4 space-y-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      className={cn(
                        "w-full rounded-2xl border px-4 py-4 text-left transition",
                        selectedTheme === theme.id
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-white",
                      )}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <p className="font-medium">{theme.id}</p>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          selectedTheme === theme.id ? "text-slate-200" : "text-slate-500",
                        )}
                      >
                        {theme.caption}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-900">Generated cuts</p>
                <p className="mt-1 text-sm text-slate-500">
                  These are the stitched pieces this demo surfaces from the uploaded material.
                </p>

                <div className="mt-4 space-y-3">
                  {generatedCuts.length ? (
                    generatedCuts.map((cut, index) => (
                      <div key={cut.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900">{cut.name}</p>
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-500">
                            Cut {index + 1}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">Built from {cut.source}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                      Upload clips first and we will surface sample cuts here.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-900">Why this page matters</p>
                <div className="mt-3 space-y-3">
                  {[
                    "Real multi-clip upload in the browser",
                    mode === "review"
                      ? "A review-ready flow for testing social proof and user submissions"
                      : "A clear product flow that is easy to demo live",
                    mode === "features"
                      ? "Space to show future features without cluttering the core demo"
                      : "Enough polish to show taste, product sense, and execution",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full" disabled={clips.length < 2} onClick={createStory}>
                <Play className="h-4 w-4 fill-white" />
                {clips.length < 2 ? "Upload at least 2 clips" : "Create stitched demo"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
