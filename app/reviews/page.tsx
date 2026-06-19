import { MessageSquareQuote, Star, UploadCloud } from "lucide-react";

import { MultiClipStudio } from "@/components/multi-clip-studio";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Hiring manager",
    quote:
      "The strongest part here is that it feels like a real product demo, not a portfolio skin on top of nothing.",
  },
  {
    name: "Design-minded founder",
    quote:
      "Clean hierarchy, clear choices, and just enough interaction to show judgment. This is easy to trust.",
  },
  {
    name: "Product engineer",
    quote:
      "The review page is smart because it lets people test the concept with their own clips instead of imagining it.",
  },
];

export default function ReviewsPage() {
  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium text-sky-700">Review flow</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
              A page where people can test it, react to it, and believe it.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              This route is built for proof. Someone can upload two or more clips, see generated cuts,
              and leave with the sense that this builder understands product, not just visuals.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                [UploadCloud, "Upload multiple clips"],
                [Star, "See stitched demo cuts"],
                [MessageSquareQuote, "Use the page as a review and credibility surface"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">{label as string}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {testimonials.map((item) => (
              <Card key={item.name} className="rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-800">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-slate-950">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <MultiClipStudio
            mode="review"
            title="Reviewer upload and social-proof demo"
            intro="Give reviewers a concrete way to test the idea: upload multiple clips, watch the stitched flow, and see sample cuts generated from what they added."
          />
        </div>
      </section>
    </main>
  );
}
