import { ArrowRight, Check, Sparkles, WandSparkles } from "lucide-react";

import { MultiClipStudio } from "@/components/multi-clip-studio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const proofPoints = [
  "Multi-clip upload and playback in-browser",
  "Clear product taste with a calmer, cleaner UI",
  "A demo structure that makes hiring confidence feel easy",
];

const workflow = [
  {
    step: "Upload",
    body: "Drop in two or more clips and immediately get a real sequence to work with.",
  },
  {
    step: "Shape",
    body: "Reorder clips, pick a tone, and generate simple demo cuts without confusion.",
  },
  {
    step: "Present",
    body: "Show something real in a hiring call instead of hand-wavy static mockups.",
  },
];

export default function HomePage() {
  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800">
            <Sparkles className="h-4 w-4" />
            Stitch demo rebuilt for clarity
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            A cleaner Stitch frontend that actually feels hire-worthy.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            This version is intentionally simple: white background, sharper hierarchy, real multi-clip
            upload, and enough product thinking to make the builder look cracked in a demo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#studio">
                Open the demo <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/features">See future features</a>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sky-700">Builder signal</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">What this demo communicates</h2>
              </div>
              <WandSparkles className="h-6 w-6 text-slate-400" />
            </div>

            <div className="mt-6 space-y-4">
              {workflow.map((item, index) => (
                <div key={item.step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.step}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-700">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="studio" className="mx-auto max-w-7xl py-6">
        <MultiClipStudio
          title="Make a mini vlog from two or more clips"
          intro="The core story on the homepage is simple: upload multiple videos, reorder them, create stitched cuts, and demo a flow that feels straightforward and polished."
        />
      </section>
    </main>
  );
}
