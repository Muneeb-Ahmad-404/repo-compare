
---

## ANSWERS.md

```md

## 1. Run steps
npm install
npm run dev

Open http://localhost:3000

No API key required.

## 2. Stack choice
Next.js + TypeScript for fast UI + type safety on API data.

No backend as an external api was to be used

## 3. Edge case
Invalid username / failed GitHub API response.

Handled in:
lib/github.ts

Prevents crashes and blocks invalid updates in UI.

## 4. AI usage
Used for:
- pagination logic corrections
- analytics function structure
- UI layout cleanup


## 5. Gap

The Repository based stats are based on 100 repos because of the api limit so the stats cannot actually show what a profile is like in reality if its total repos are more than 100. I would like to deal with that by more than one api requests for the same profile if the total repos amount to more than 100..
