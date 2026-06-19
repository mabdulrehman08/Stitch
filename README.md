# Stitch Hiring Demo

This project is a hiring-focused product demo for Stitch: a cleaner, sharper frontend that shows taste, product thinking, and real interaction instead of a static mockup.

## The pitch

The point of this demo is simple:

- show a polished white-background UI with better readability
- show real multi-clip upload and stitched playback behavior
- show product thinking through a roadmap page
- show credibility through a review and social-proof page

If you are pitching this live, the story is:

1. Open the home page and show the cleaner hero and the core value proposition.
2. Upload two or more clips in the multi-clip studio.
3. Reorder them, create the stitched result, and show the generated cuts.
4. Move to the features page to show roadmap thinking and future product direction.
5. Move to the reviews page to show how users or reviewers could test the idea themselves.

## What this demonstrates

- frontend polish and visual judgment
- product sense, not just implementation
- reusable component thinking
- an understandable demo flow for a hiring conversation

## Pages

- `/` - main hiring/demo page
- `/features` - future features and roadmap framing
- `/reviews` - review flow and reviewer upload experience

## Core interactions

- upload 2 or more video clips
- reorder clips before stitching
- preview uploaded clips
- generate simple stitched demo cuts
- reuse the same studio flow across multiple product contexts

## Local run

1. Open a terminal in `C:\Users\muham\stitch\Stitch`
2. Install dependencies:

```powershell
npm.cmd install
```

3. Start the dev server:

```powershell
npm.cmd run dev
```

4. Open:

```text
http://localhost:3000
```

## Notes

- Use `npm.cmd` in PowerShell if `npm` is blocked by execution policy.
- If Next.js fails because of a broken local install or missing SWC/runtime pieces, reinstall dependencies and try again.
- This repo is currently optimized as a demo artifact: readable, presentable, and easy to walk through live.
