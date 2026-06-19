import { Lightbulb, Rocket, Users2 } from "lucide-react";

import { MultiClipStudio } from "@/components/multi-clip-studio";
import { Card, CardContent } from "@/components/ui/card";

const ideas = [
  {
    icon: Rocket,
    title: "Auto chaptering",
    body: "Detect day beats automatically and split a long recap into moments like arrival, middle, and close.",
  },
  {
    icon: Users2,
    title: "Shared camera rolls",
    body: "Let multiple people upload clips into one event timeline, then dedupe angles and surface the best ones.",
  },
  {
    icon: Lightbulb,
    title: "Prompted edit directions",
    body: "Turn short natural-language prompts into pacing, order, and caption suggestions.",
  },
];

const roadmap = [
  "Invite collaborators into one event page",
  "Generate multiple cut styles from the same source material",
  "Add captions, chapter cards, and export presets",
  "Summarize the event in a cleaner memory journal format",
];

export default function FeaturesPage() {
  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-sky-700">Feature thinking</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
            The next page shows product thinking, not just screens.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This is where you prove you can go beyond a single demo interaction: roadmap sense,
            feature framing, and a believable point of view about where the product should go.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {ideas.map((item) => (
            <Card key={item.title} className="rounded-3xl">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-sky-700">Roadmap</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">What I would add next</h2>
              <div className="mt-5 space-y-3">
                {roadmap.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-950">
                      {index + 1}. {item}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <MultiClipStudio
            mode="features"
            title="Future-feature sandbox"
            intro="This page doubles as a product sandbox: upload clips, create a stitched draft, and use the surrounding roadmap to show how the interaction could evolve without losing simplicity."
          />
        </div>
      </section>
    </main>
  );
}
