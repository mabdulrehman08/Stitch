"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Check,
  ChevronRight,
  Film,
  Library,
  Play,
  Plus,
  Share2,
  Sparkles,
  Upload,
  Users,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Theme = "Daily" | "Cinematic" | "Friends";

type Clip = {
  id: string;
  file: File;
  url: string;
  durationLabel: string;
  sizeLabel: string;
};

const themes: Array<{
  id: Theme;
  caption: string;
  accent: string;
}> = [
  { id: "Daily", caption: "Soft pacing and clean cuts", accent: "from-emerald-300/40 to-white/10" },
  { id: "Cinematic", caption: "Stronger contrast and chapter beats", accent: "from-orange-300/40 to-white/10" },
  { id: "Friends", caption: "Shared-memory energy and quick swaps", accent: "from-sky-300/40 to-white/10" },
];

const journalDays = [
  { day: "Mon", status: "ready" },
  { day: "Tue", status: "ready" },
  { day: "Wed", status: "empty" },
  { day: "Thu", status: "ready" },
  { day: "Fri", status: "live" },
  { day: "Sat", status: "upcoming" },
  { day: "Sun", status: "upcoming" },
] as const;

const starterMoments = [
  { title: "Morning coffee", meta: "03 clips" },
  { title: "Walk outside", meta: "02 clips" },
  { title: "Late-night wrap", meta: "01 clip" },
] as const;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function makeDurationLabel(index: number) {
  const seconds = 6 + index * 3;
  return `00:${seconds.toString().padStart(2, "0")}`;
}

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const clipUrlsRef = useRef<string[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<Theme>("Daily");
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [includeSharedMemory, setIncludeSharedMemory] = useState(true);
  const [storyCreated, setStoryCreated] = useState(false);

  useEffect(() => {
    clipUrlsRef.current = clips.map((clip) => clip.url);
  }, [clips]);

  useEffect(() => {
    return () => {
      clipUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const totalDurationLabel = useMemo(() => {
    const totalSeconds = clips.reduce((sum, _, index) => sum + 6 + index * 3, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [clips]);

  const featuredClip = clips[currentClipIndex] ?? null;

  const storyStats = useMemo(() => {
    const finalClips = clips.length;
    const scenes = Math.max(1, Math.ceil(finalClips / 2));
    const energy = selectedTheme === "Cinematic" ? "High" : selectedTheme === "Friends" ? "Playful" : "Warm";

    return [
      { label: "Clips ready", value: finalClips.toString().padStart(2, "0") },
      { label: "Mini vlog", value: totalDurationLabel },
      { label: "Mood", value: energy },
      { label: "Scenes", value: scenes.toString().padStart(2, "0") },
    ];
  }, [clips.length, selectedTheme, totalDurationLabel]);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("video/"),
    );

    if (!files.length) {
      return;
    }

    setClips((current) => {
      const next = [
        ...current,
        ...files.map((file, index) => ({
          id: `${file.name}-${file.lastModified}-${current.length + index}`,
          file,
          url: URL.createObjectURL(file),
          durationLabel: makeDurationLabel(current.length + index),
          sizeLabel: formatBytes(file.size),
        })),
      ];

      if (current.length === 0) {
        setCurrentClipIndex(0);
      }

      return next;
    });

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
    setStoryCreated(false);
    setIsPlayingAll(false);
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
    <main className="min-h-screen bg-[#08090c] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <section className="mx-auto w-full max-w-[420px] shrink-0">
          <div className="stitch-phone overflow-hidden rounded-[32px] border border-white/10 bg-[#111318] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <header className="border-b border-white/8 px-5 pb-4 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/38">stitch</p>
                  <h1 className="mt-2 text-[28px] font-semibold tracking-tight">
                    Mini vlog journal
                  </h1>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65">
                  Friday
                </div>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2">
                {journalDays.map((item) => (
                  <div key={item.day} className="text-center">
                    <p className="mb-2 text-[11px] text-white/36">{item.day}</p>
                    <div
                      className={cn(
                        "mx-auto h-10 w-10 rounded-2xl border text-xs",
                        item.status === "ready" &&
                          "border-white/10 bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.08)]",
                        item.status === "live" && "border-emerald-300/40 bg-emerald-300/20 text-white",
                        item.status === "empty" && "border-white/10 bg-white/[0.03] text-white/38",
                        item.status === "upcoming" && "border-white/10 bg-transparent text-white/48",
                      )}
                    >
                      <span className="inline-flex h-full items-center justify-center">
                        {item.status === "ready" ? <Check className="h-4 w-4" /> : item.day.slice(0, 1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </header>

            <div className="space-y-4 p-4">
              <Card className="rounded-[24px] border-white/8 bg-white/[0.04]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-white/50">Today&apos;s vlog</p>
                      <h2 className="mt-1 text-2xl font-semibold">A calm little recap</h2>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-white/10 bg-white/6 p-2 text-white/70 transition hover:bg-white/12"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div
                    className={cn(
                      "mt-4 overflow-hidden rounded-[24px] border border-white/8 bg-black",
                      !featuredClip && "flex min-h-[270px] items-center justify-center bg-[#0c0e12]",
                    )}
                  >
                    {featuredClip ? (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          key={featuredClip.id}
                          className="aspect-[9/16] w-full object-cover"
                          controls
                          playsInline
                          onEnded={handleVideoEnded}
                          poster=""
                        >
                          <source src={featuredClip.url} type={featuredClip.file.type} />
                        </video>
                        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-4 py-4 text-sm">
                          <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-xs text-white/75">
                            {selectedTheme} mode
                          </span>
                          <span className="text-white/75">
                            {currentClipIndex + 1}/{clips.length}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Upload 2 or more videos</p>
                          <p className="mt-1 text-sm leading-6 text-white/48">
                            We&apos;ll line them up into one mini vlog flow right here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {storyStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/8 bg-black/35 p-3">
                        <p className="text-lg font-semibold">{stat.value}</p>
                        <p className="mt-1 text-[11px] text-white/42">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[24px] border-white/8 bg-white/[0.04]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/50">Moments</p>
                      <h3 className="mt-1 text-lg font-semibold">Today&apos;s building blocks</h3>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {(clips.length ? clips.slice(0, 3).map((clip, index) => ({
                      title: clip.file.name.replace(/\.[^.]+$/, ""),
                      meta: clip.durationLabel,
                      index,
                    })) : starterMoments.map((item, index) => ({ ...item, index }))).map((moment) => (
                      <div
                        key={`${moment.title}-${moment.index}`}
                        className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/35 px-3 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                            <Play className="h-4 w-4 fill-black" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{moment.title}</p>
                            <p className="text-xs text-white/42">{moment.meta}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/34" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <nav className="grid grid-cols-4 gap-2 rounded-[28px] border border-white/8 bg-white/[0.04] p-2">
                {[
                  [Film, "Today"],
                  [Library, "Journal"],
                  [Users, "Shared"],
                  [CalendarDays, "Calendar"],
                ].map(([Icon, label], index) => (
                  <button
                    key={label as string}
                    type="button"
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-[22px] px-3 py-3 text-[11px] text-white/46 transition",
                      index === 0 && "bg-white text-black",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label as string}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section className="flex-1">
          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.9fr]">
            <Card className="overflow-hidden rounded-[28px] border-white/8 bg-[#101319]">
              <CardContent className="p-0">
                <div className="border-b border-white/8 px-5 py-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-white/48">Create</p>
                      <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                        Make a mini vlog from multiple videos
                      </h2>
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
                      Upload videos
                    </Button>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
                    This prototype now accepts two or more video files, builds a stitched playback
                    queue, and lets us tune the feel before export.
                  </p>
                </div>

                <div className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[24px] border border-white/8 bg-black/30 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/46">Clip tray</p>
                        <h3 className="mt-1 text-xl font-semibold">
                          {clips.length ? `${clips.length} uploaded clips` : "Waiting for clips"}
                        </h3>
                      </div>
                      <div className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-white/60">
                        {totalDurationLabel} total
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {clips.length ? (
                        clips.map((clip, index) => (
                          <div
                            key={clip.id}
                            className={cn(
                              "flex items-center gap-3 rounded-[22px] border border-white/8 bg-[#0d1015] p-3",
                              currentClipIndex === index && "border-white/20 bg-white/[0.06]",
                            )}
                          >
                            <button
                              type="button"
                              className="relative h-20 w-16 overflow-hidden rounded-[18px] border border-white/10 bg-black"
                              onClick={() => {
                                setCurrentClipIndex(index);
                                setIsPlayingAll(false);
                              }}
                            >
                              <video
                                className="h-full w-full object-cover"
                                src={clip.url}
                                muted
                                playsInline
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                            </button>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{clip.file.name}</p>
                              <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/42">
                                <span>{clip.durationLabel}</span>
                                <span>{clip.sizeLabel}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 rounded-full"
                                onClick={() => moveClip(index, -1)}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 rounded-full"
                                onClick={() => moveClip(index, 1)}
                                disabled={index === clips.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>

                            <button
                              type="button"
                              className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/58 transition hover:bg-white/8 hover:text-white"
                              onClick={() => removeClip(clip.id)}
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[24px] border border-dashed border-white/10 bg-[#0d1015] px-5 py-10 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <p className="mt-4 text-lg font-medium">Drop in your day</p>
                          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/44">
                            Add a couple of clips from your camera roll and we&apos;ll turn them into one
                            tighter journal-style sequence.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-white/8 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/46">Style</p>
                          <h3 className="mt-1 text-xl font-semibold">Choose the vibe</h3>
                        </div>
                        <WandSparkles className="h-5 w-5 text-white/54" />
                      </div>
                      <div className="mt-4 space-y-2">
                        {themes.map((theme) => (
                          <button
                            key={theme.id}
                            type="button"
                            className={cn(
                              "w-full rounded-[22px] border border-white/8 px-4 py-4 text-left transition",
                              selectedTheme === theme.id
                                ? "bg-white text-black"
                                : "bg-[#0d1015] text-white hover:bg-white/[0.06]",
                            )}
                            onClick={() => setSelectedTheme(theme.id)}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-medium">{theme.id}</p>
                                <p
                                  className={cn(
                                    "mt-1 text-xs",
                                    selectedTheme === theme.id ? "text-black/70" : "text-white/44",
                                  )}
                                >
                                  {theme.caption}
                                </p>
                              </div>
                              <div
                                className={cn(
                                  "h-10 w-10 rounded-full border",
                                  selectedTheme === theme.id
                                    ? "border-black/10 bg-black/10"
                                    : "border-white/10",
                                  `bg-gradient-to-br ${theme.accent}`,
                                )}
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/46">Extra features</p>
                          <h3 className="mt-1 text-xl font-semibold">Journal tools</h3>
                        </div>
                        <Users className="h-5 w-5 text-white/54" />
                      </div>

                      <label className="mt-4 flex cursor-pointer items-center justify-between rounded-[22px] border border-white/8 bg-[#0d1015] px-4 py-4">
                        <div>
                          <p className="text-sm font-medium">Include shared memory mode</p>
                          <p className="mt-1 text-xs text-white/44">
                            Keep the UI ready for multi-person uploads and one merged recap.
                          </p>
                        </div>
                        <span
                          className={cn(
                            "flex h-7 w-12 items-center rounded-full border px-1 transition",
                            includeSharedMemory
                              ? "border-emerald-300/40 bg-emerald-300/20"
                              : "border-white/10 bg-white/6",
                          )}
                          onClick={() => setIncludeSharedMemory((value) => !value)}
                        >
                          <span
                            className={cn(
                              "h-5 w-5 rounded-full transition",
                              includeSharedMemory
                                ? "translate-x-5 bg-white"
                                : "translate-x-0 bg-white/50",
                            )}
                          />
                        </span>
                      </label>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {[
                          ["Reorder clips", "Long-press style ordering is mapped to up/down controls here."],
                          ["Clip export", "Final flow is ready for a selected export pass."],
                          ["Calendar journal", "Daily logging and stitched-day markers stay visible."],
                          ["Share frame", "Preview screen keeps the handoff area ready for sharing."],
                        ].map(([title, copy]) => (
                          <div key={title} className="rounded-[22px] border border-white/8 bg-[#0d1015] p-4">
                            <p className="text-sm font-medium">{title}</p>
                            <p className="mt-2 text-xs leading-5 text-white/44">{copy}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      disabled={clips.length < 2}
                      onClick={createStory}
                    >
                      <Film className="h-4 w-4" />
                      {clips.length < 2 ? "Upload at least 2 videos" : "Create mini vlog"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-white/8 bg-[#101319]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/48">Output</p>
                    <h2 className="mt-1 text-2xl font-semibold">Stitched plan</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/58">
                    {storyCreated ? "Ready" : "Draft"}
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-white/8 bg-black/30 p-4">
                  <p className="text-sm text-white/46">Sequence summary</p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {storyCreated ? "Your mini vlog is lined up" : "Waiting to generate"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/46">
                    {storyCreated
                      ? `We are playing through ${clips.length} clips in ${selectedTheme.toLowerCase()} mode with ${includeSharedMemory ? "shared memory" : "solo journal"} features ready.`
                      : "Once clips are uploaded, this panel becomes the stitched outline for the day."}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { step: "Open", copy: clips[0]?.file.name ?? "Start with the first uploaded clip" },
                    {
                      step: "Middle",
                      copy:
                        clips[1]?.file.name ??
                        "Use 2 or more clips so the middle section can carry the day forward",
                    },
                    {
                      step: "Close",
                      copy: clips[clips.length - 1]?.file.name ?? "End on a softer wrap-up moment",
                    },
                  ].map((item, index) => (
                    <div key={item.step} className="flex gap-3 rounded-[22px] border border-white/8 bg-black/30 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.step}</p>
                        <p className="mt-1 text-sm leading-6 text-white/44">{item.copy}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[24px] border border-white/8 bg-black/30 p-4">
                  <p className="text-sm text-white/46">What this prototype covers</p>
                  <div className="mt-3 grid gap-3">
                    {[
                      "Real multi-video upload in the browser",
                      "Clip reordering before the mini vlog is created",
                      "Single stitched playback flow across uploaded clips",
                      "Journal, calendar, shared-memory, and share-ready UI surfaces",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/72">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
