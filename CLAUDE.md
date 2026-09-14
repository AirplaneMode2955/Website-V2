# Photo imports

New site photos come from the **"Website Photo Inbox"** Google Drive folder:
https://drive.google.com/drive/folders/1n3lOXXEJmDRQst8Pj_aWJOah07UO3Huf

Jett drops trip/event photos in there whenever, with no fixed cadence. When
asked to "pull new photos," "import the new photos," or similar:

1. List files in the Website Photo Inbox folder (Google Drive `search_files`
   with `parentId = '1n3lOXXEJmDRQst8Pj_aWJOah07UO3Huf'`).
2. Compare against `src/data/lifePhotos.ts` — any Drive file whose name
   doesn't already appear as a `src` in that array hasn't been imported yet.
3. Download each new file (`download_file_content` returns base64) and write
   it into `public/` under its original filename — write the base64 to a
   scratch file first, then decode with `base64 -d` to get real binary; do
   not write base64 text directly into the image file.
4. View each saved photo with the Read tool to write accurate, natural alt
   text matching the existing style in `lifePhotos.ts`. Never invent alt
   text without actually looking at the photo.
5. Append the new entries to `src/data/lifePhotos.ts`. Use judgment on
   ordering — e.g. keep photos from the same trip together — and ask if
   grouping isn't obvious from context.
6. Verify with `npx tsc --noEmit` (and `npm run build` if there's time),
   then commit and push straight to `main`. This project deploys to
   production automatically on every push to main via Vercel's GitHub
   integration, so no PR is needed for routine photo additions like this.
