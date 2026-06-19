"use client";

import {
  ArrowRight,
  Clapperboard,
  Film,
  Home,
  Layers3,
  Play,
  Settings,
  Share2,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stories = [
  {
    title: "NYC Weekend",
    meta: "03:42",
    clips: "186 clips",
    confidence: "96%",
    summary: "Coffee runs, subway rides, gallery wandering, and one perfect rain-soaked rooftop ending.",
  },
  {
    title: "Summer Road Trip",
    meta: "06:18",
    clips: "312 clips",
    confidence: "94%",
    summary: "Nine cities, five friends, motel breakfasts, desert highways, and the Pacific at sunset.",
  },
  {
    title: "Startup Demo Day",
    meta: "02:56",
    clips: "74 clips",
    confidence: "91%",
    summary: "Pitch rehearsals, badge scans, investor questions, and the first time the room went quiet.",
  },
  {
    title: "Gym Transformation",
    meta: "04:22",
    clips: "128 clips",
    confidence: "93%",
    summary: "A measured arc from shaky first sets to confident progress checks and race-day discipline.",
  },
];

const stats = [
  ["1,284", "clips analyzed"],
  ["14", "stories discovered"],
  ["48", "reels generated"],
];

const clips = ["IMG_2048", "VID_8310", "NYC_12", "ROOF_04", "SUBWAY_8"];
const navItems = [
  [Home, "Home"],
  [Clapperboard, "Stories"],
  [Layers3, "Projects"],
  [Share2, "Shared Vlogs"],
  [Film, "Life Documentary"],
  [Settings, "Settings"],
];

function MiniThumb({
  className,
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={cn(
        "thumbnail-noise relative overflow-hidden rounded-md border border-white/14 bg-white/5",
        className,
      )}
    >
      <div className="absolute inset-x-3 top-3 h-1 rounded-full bg-white/55" />
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div className="h-8 w-12 rounded-sm bg-black/45" />
        <div className="rounded-full border border-white/18 bg-black/50 px-2 py-1 text-[10px] text-white/80">
          0{index + 1}:2{index}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-white/52">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
        {title}
      </h2>
      {text ? <p className="mt-5 text-lg leading-8 text-white/60">{text}</p> : null}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Hero />
      <HowItWorks />
      <StoryDiscovery />
      <LifeDocumentary />
      <Dashboard />
      <VlogStudio />
      <SharedMemories />
    </main>
  );
}

function Hero() {
  const floating = [
    "left-[7%] top-[23%] h-28 w-20 rotate-[-8deg]",
    "right-[8%] top-[22%] h-24 w-36 rotate-[7deg]",
    "left-[16%] bottom-[18%] h-24 w-40 rotate-[5deg]",
    "right-[20%] bottom-[15%] h-32 w-24 rotate-[-6deg]",
    "left-[45%] top-[12%] h-20 w-32 rotate-[3deg]",
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
      <div className="mono-grid absolute inset-0 animate-grid-drift opacity-55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_70%)]" />
      {floating.map((item, index) => (
        <motion.div
          key={item}
          className={cn("absolute hidden sm:block", item)}
          animate={{ y: [0, -18, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          <MiniThumb index={index} className="h-full w-full shadow-2xl shadow-black" />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/16 bg-black/70 px-4 py-2 text-sm text-white/72 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          14 stories discovered from your last import
        </div>
        <h1 className="text-balance text-6xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
          Your Camera Roll Already Has a Story.
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-balance text-lg leading-8 text-white/68 sm:text-xl">
          Upload hundreds of clips. Stitch discovers the moments, builds the
          narrative, and turns memories into cinematic vlogs.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg">
            Create a Story <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            <Play className="h-4 w-4 fill-white" /> Watch Demo
          </Button>
        </div>
      </motion.div>
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function HowItWorks() {
  const steps = [
    [Upload, "Upload Your Gallery", "Import hundreds of clips at once."],
    [Wand2, "AI Finds the Story", "We identify events, people, locations, and moments."],
    [Film, "Generate Your Vlog", "Travel vlog, documentary, recap, shorts, and more."],
  ];

  return (
    <section className="px-6 py-28">
      <SectionHeading eyebrow="How it works" title="From raw clips to a finished arc." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-4 md:grid-cols-3">
        {steps.map(([Icon, title, text], index) => (
          <motion.div
            key={title as string}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <Card className="h-full p-2">
              <CardHeader>
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-white/40">Step {index + 1}</p>
                <CardTitle>{title as string}</CardTitle>
                <CardDescription className="text-base">{text as string}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StoryDiscovery() {
  return (
    <section className="px-6 py-28">
      <SectionHeading
        eyebrow="Story discovery"
        title="Stitch sees the plot hiding in the archive."
        text="A large-scale memory engine groups clips into watchable stories with context, confidence, and a first-pass visual identity."
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-lg border border-white/12 bg-white/[0.035]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-sm text-white/45">Stories Found</p>
            <h3 className="text-2xl font-semibold">Latest import: 642 clips</h3>
          </div>
          <Button variant="outline">Review All</Button>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-2">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              whileHover={{ y: -5 }}
              className="rounded-lg border border-white/10 bg-black p-4"
            >
              <MiniThumb index={index} className="mb-5 h-44 w-full" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-semibold">{story.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">
                    {story.summary}
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
                  {story.confidence}
                </div>
              </div>
              <div className="mt-5 flex gap-2 text-xs text-white/52">
                <span>{story.meta}</span>
                <span>/</span>
                <span>{story.clips}</span>
                <span>/</span>
                <span>AI confidence</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function LifeDocumentary() {
  const events = [
    ["2024", "First Day in SF", "Apartment keys, foggy windows, and the first clip from Dolores Park."],
    ["2025", "First Startup Event", "Badge pickup, shaky booth footage, and a room full of new names."],
    ["2026", "First Product Launch", "The final build, the first customer, and a quiet walk home after midnight."],
  ];

  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-white/52">
            Life documentary
          </p>
          <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Turn Years of Memories Into One Film
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Stitch can compress years of ordinary clips into a feature-length
            memory with chapters, recurring characters, and emotional pacing.
          </p>
          <Button className="mt-9" size="lg">
            Generate Documentary <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-white/18" />
          {events.map(([year, title, copy], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 ml-14 rounded-lg border border-white/12 bg-white/[0.035] p-6"
            >
              <div className="absolute -left-[47px] top-7 h-4 w-4 rounded-full border border-white bg-black" />
              <p className="text-sm text-white/45">{year}</p>
              <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-white/58">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="px-4 py-28 sm:px-6">
      <SectionHeading
        eyebrow="App dashboard"
        title="A calm command center for every memory."
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 grid max-w-7xl overflow-hidden rounded-lg border border-white/12 bg-white/[0.035] lg:grid-cols-[260px_1fr]"
      >
        <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-black">
              S
            </div>
            <div>
              <p className="font-semibold">Stitch</p>
              <p className="text-xs text-white/45">Muhammad's Library</p>
            </div>
          </div>
          <nav className="grid gap-1">
            {navItems.map(([Icon, label], index) => (
              <button
                key={label as string}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm text-white/58 transition hover:bg-white/8 hover:text-white",
                  index === 0 && "bg-white text-black hover:bg-white hover:text-black",
                )}
              >
                <Icon className="h-4 w-4" />
                {label as string}
              </button>
            ))}
          </nav>
        </aside>
        <div className="p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-white/45">Dashboard</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight">
                Good evening, Muhammad.
              </h2>
            </div>
            <Button>
              <Upload className="h-4 w-4" /> Upload Clips
            </Button>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black p-5">
                <p className="text-4xl font-semibold">{value}</p>
                <p className="mt-2 text-sm text-white/50">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            {stories.slice(0, 3).map((story, index) => (
              <div key={story.title} className="rounded-lg border border-white/10 bg-black p-4">
                <MiniThumb index={index} className="h-40 w-full" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{story.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">{story.summary}</p>
                    <p className="mt-3 text-xs text-white/42">{story.clips}</p>
                  </div>
                  <Button className="shrink-0">Create Vlog</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function VlogStudio() {
  const modes = ["Travel Vlog", "Documentary", "Funny Recap", "Creator Mode"];

  return (
    <section className="px-6 py-28">
      <SectionHeading
        eyebrow="Vlog studio"
        title="Edit the story with AI in the loop."
      />
      <div className="mx-auto mt-16 grid max-w-7xl gap-4 lg:grid-cols-[260px_1fr_300px]">
        <div className="rounded-lg border border-white/12 bg-white/[0.035] p-4">
          <h3 className="mb-4 font-semibold">Uploaded clips</h3>
          <div className="grid gap-3">
            {clips.map((clip, index) => (
              <div key={clip} className="flex items-center gap-3 rounded-md border border-white/10 bg-black p-2">
                <MiniThumb index={index} className="h-14 w-20 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{clip}</p>
                  <p className="text-xs text-white/42">00:{18 + index * 7}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/12 bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Timeline editor</h3>
            <p className="text-sm text-white/45">03:42 final cut</p>
          </div>
          <div className="flex h-80 items-center justify-center rounded-lg border border-white/10 bg-black">
            <div className="w-full px-5">
              <div className="mb-8 aspect-video rounded-lg border border-white/12 bg-white/[0.04] p-3">
                <MiniThumb className="h-full w-full" />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2.4, delay: item * 0.2, repeat: Infinity }}
                    className="h-12 rounded-sm bg-white"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/12 bg-white/[0.035] p-4">
          <h3 className="mb-4 font-semibold">AI controls</h3>
          <div className="grid gap-2">
            {modes.map((mode, index) => (
              <button
                key={mode}
                className={cn(
                  "rounded-md border border-white/10 px-4 py-3 text-left text-sm transition hover:bg-white/8",
                  index === 0 && "bg-white text-black hover:bg-white",
                )}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-md border border-white/10 bg-black p-4">
            <p className="text-sm text-white/45">Narrative prompt</p>
            <p className="mt-2 text-sm leading-6">
              Make it cinematic, fast in the opening, quiet at the rooftop, and
              end on the train ride home.
            </p>
          </div>
          <Button className="mt-5 w-full" size="lg">
            Create Story
          </Button>
        </div>
      </div>
    </section>
  );
}

function SharedMemories() {
  const friends = ["Friend A clips", "Friend B clips", "Friend C clips"];

  return (
    <section className="px-6 pb-32 pt-28">
      <SectionHeading
        eyebrow="Shared memories"
        title="Everyone uploads. Stitch makes one memory."
        text="Multiple camera rolls become one unified vlog, with duplicate moments merged and missing angles filled in automatically."
      />
      <div className="relative mx-auto mt-16 max-w-5xl rounded-lg border border-white/12 bg-white/[0.035] p-6 sm:p-10">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <motion.path
            d="M 150 120 C 340 80, 430 210, 520 230 S 710 300, 850 170"
            fill="none"
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1"
            strokeDasharray="8 10"
            animate={{ strokeDashoffset: [0, -72] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 170 330 C 320 260, 410 380, 520 230 S 705 120, 840 330"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            strokeDasharray="8 10"
            animate={{ strokeDashoffset: [0, -72] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <div className="relative grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div className="grid gap-4">
            {friends.map((friend, index) => (
              <motion.div
                key={friend}
                whileHover={{ x: 6 }}
                className="flex items-center justify-between rounded-lg border border-white/12 bg-black p-4"
              >
                <div className="flex items-center gap-3">
                  <MiniThumb index={index} className="h-16 w-20" />
                  <div>
                    <p className="font-medium">{friend}</p>
                    <p className="text-sm text-white/45">{84 + index * 37} clips uploaded</p>
                  </div>
                </div>
                <div className="h-3 w-3 rounded-full bg-white" />
              </motion.div>
            ))}
          </div>
          <div className="rounded-lg border border-white/12 bg-black p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Unified vlog</p>
                <h3 className="text-3xl font-semibold">Launch Weekend</h3>
              </div>
              <Share2 className="h-5 w-5 text-white/55" />
            </div>
            <MiniThumb className="h-72 w-full" />
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-white/55">
              <div className="rounded-md border border-white/10 p-3">3 camera rolls</div>
              <div className="rounded-md border border-white/10 p-3">221 clips</div>
              <div className="rounded-md border border-white/10 p-3">1 final story</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
