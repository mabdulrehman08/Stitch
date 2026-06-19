# Stitch Prototype

This is a Next.js prototype for a Stitch-style mini vlog journal.

## Run locally

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

## Build check

To make a production build:

```powershell
npm.cmd run build
```

## Notes

- On this machine, `npm` in PowerShell may be blocked by execution policy, so `npm.cmd` is the safer command.
- If `next` fails to start or build because of missing SWC files or a broken install, remove `node_modules` and reinstall dependencies, then try again.
- The current prototype includes multi-video upload, clip reordering, stitched playback flow, and a Stitch-inspired mobile-first UI.
