# Ria — interactive prototype

A clickable build of the **Ria AI Redesign (V2)** screen set: one phone, centred, no sidebar.
Every flow is stateful — the plan, the food log and the totals all recompute as you use it.

## Run it

```bash
python3 -m http.server 4178
```

Then open <http://localhost:4178>. No build step, no dependencies (Poppins loads from Google Fonts).

## The guide sidebar

Pinned to the left edge of the window, full height, with its own scroll, is prototype chrome —
not part of the app. The phone keeps centring itself in whatever room is left. It names the
**three core flows** and, for each, the tap route plus the phrases you can type:

| # | Flow | What it is |
| --- | --- | --- |
| 01 | Change your plan | Ria has already planned the day; swap anything not yet eaten |
| 02 | Suggest a meal | Whole alternatives for a meal; adding one replaces what is planned |
| 03 | Understand my nutrition | Where the day lands, and what to do about the next meal |

They are not three parallel features — they are three relationships to one object, the plan:
change it, add to it, read it.

The sidebar is **read-only**: it explains, the phone does. There are no Try-it buttons and no
progress tracking. Card 02 lists the per-meal asks, since naming the meal is the part people do
not guess — *"suggest lunch options"*, *"dinner options"*, *"snack ideas"*, *"what else could I
have?"*. Every phrase printed on a card is checked against `respond()`.

**Hide** collapses the sidebar to a pill at the top-left, which is out of flow, so the phone
returns to the true centre of the window for screenshots; the choice is remembered in
`localStorage`. Under 980px the sidebar gives up and stacks above the phone as a card.

Logging is the footnote, not a fourth card: all three flows are forward-looking (decide what to
eat) and logging is what makes them true (record what you ate). The model and the rationale stay
in this README — the sidebar's only job is naming the three flows and how to reach them.

## The right-hand chrome

Top right, two buttons:

- **Portfolio** — opens the Notion portfolio in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
- **What I don't know** — slides in a pane stating the limits of the exercise: that this is an
  outside-in redesign made without the team's architecture, data, cost, legal and business
  constraints, and that it is an exploration rather than a claim to be better.

The pane is written out in `index.html` and opens by toggling a class, so it is a CSS transition
on a live node rather than a rebuild. It closes on the ✕, on the scrim, and on Esc — Esc falls
through to voice and the swap sheet when the pane is shut. It overlays rather than pushing the
stage, so it never fights the sidebar for width; under 980px the buttons join the flow above the
stacked sidebar instead of sitting on top of it.

## What's wired

You start on the home screen and tap **Chat** — its hit area was measured off the image,
so it sits exactly on the button. **Voice** on the home screen is deliberately inert.

| Deck screen | How to reach it |
| --- | --- |
| 02 Suggest a meal | Chat → **Suggest a meal** (targets the next un-eaten meal), or name one: "suggest something for dinner" |
| 03 Plan my day | Chat → **Open plan** on the Today’s plan card |
| 04 Change one meal | Plan → **Change** on any meal not yet eaten |
| 05 One live plan | Chat → type "can you make dinner dairy-free?" |
| 06 Voice, one question | The mic button in the chat composer |
| 07 Logged | Answer the "How were they cooked?" question |
| 08 Correction, finished | Then type "actually they were fried, sorry" |

The deck's adaptive bottom sheet is gone. Picking Voice or Chat happens on the home screen,
and what the sheet used to list now arrives **inside the chat**, as Ria's opening
suggestions — lighter cards in the thread rather than a panel you opened.

## What's real, not faked

- **Every planned meal is component-modelled**, and one sheet drives all of them. A meal is a
  choice plus two portions over a fixed remainder, so the swap sheet's live preview and the plan's
  day total are computed, never hardcoded:

  | Meal | Choice | Portions | Fixed |
  | --- | --- | --- | --- |
  | Morning snack | Almonds / Walnuts / Seeds | 5–40 g, fruit 0–2 | — |
  | Lunch | Rice / Millet / Quinoa | grain ¼–1½ cup, dal ½–2 cup | poriyal |
  | Evening snack | Chana / Curd / Peanuts | 10–150 g, fruit 0–2 | — |
  | Dinner | Paneer / Tofu / Soya | 50–200 g, roti 0–4 | vegetables |

  The per-unit values were back-solved so each meal reproduces the deck exactly — lunch
  450 Cal / 17 g, evening snack 220 / 8, dinner 380 / 21, and paneer → tofu still takes dinner
  380 → 260 Cal. The day is 1,487 Cal / 63 g rather than the deck's 1,400 / 60, because the
  plan now carries a fifth meal.

- **The two routes offer different things.** **Change** on a meal card swaps a component inside
  the same dish — paneer for tofu, rice for millet — and sets portions. **Ask Ria for other
  options** returns whole different dishes for that meal. No idea restates a Change option, and
  every meal has its own list — lunch is grain-forward and fuller, dinner lighter — so no two
  meals hand you the same suggestions.
- **Suggestions follow the day.** "Suggest a meal" offers the first meal still to come, and the
  ideas are sized for it — a 420 Cal rajma for dinner, a 160 Cal makhana for a snack. Naming a
  meal you have already eaten falls through to the next one, and says so.
- **Eaten meals cannot be changed.** Breakfast starts eaten, and any meal Ria logs into becomes
  eaten — the card drops its Change button for View log, since there is nothing left to choose.
- **"Understand my nutrition" ends with a recommendation, not a dashboard.** It answers in two
  directions. Backwards, it judges a meal already eaten against the day's own ratio — 75 g over
  1,500 Cal, so 5 g protein per 100 Cal — and names what would have fixed it: breakfast's idli
  and chutney is 259 Cal for 8 g, about 5 g short, which 100 g of curd would have covered.
  Forwards, it projects where the day lands on the current plan and says how far that is from
  the target. Changing a meal is the plan screen's job, so the card ends with ideas for the next
  meal rather than a second route into the Change sheet.
- **Log plan means it.** It writes every meal still to come into the food log and marks it eaten,
  the same way Ria's own logging does; the chip goes Draft → Logged and the day's totals come
  from the log afterwards. It is not a save. It stays reversible: the footer button becomes
  **Undo logging**, restoring the whole plan and log from a snapshot taken before the write.
- **Undo works everywhere** — on a log entry, on a corrected entry, and on a plan change — and it
  restores the exact prior state of that meal.
- **Correction collapses history.** When you correct an entry, the earlier log card folds into a
  one-line summary, matching screen 08.
- **Logging feeds the plan.** When Ria logs food into a meal, that slot flips to **Eaten** and
  starts showing what was actually eaten rather than what was planned — the snack becomes
  "Khakra and boiled eggs • 0.5 piece khakra • 2 large boiled eggs" — and the plan's estimate for
  that meal is replaced by the logged totals, so the day total moves with it. Undo puts the
  planned meal back exactly as it was.
- **Asking for ideas is not logging.** Taking up a meal idea edits the plan and leaves it
  planned; only logging marks a meal eaten. Note the suggestion button is labelled **Log /
  Logged** by request, while the action it performs is still a plan edit — so Ria's line above
  the ideas ("in your plan rather than your food log") reads against the button. Either the copy
  or the behaviour needs to move for those two to agree.

## Typing to Ria

The composer understands: dairy-free / tofu, eggs, a cooking correction (fried, boiled…),
suggest / idea / option / dinner / lunch / snack, plan, nutrition / protein / calorie / macro,
workout. Anything else gets a capability reply. Each group also matches its plural, so
"how am I doing on calories?", "what are my options?" and "show me my macros" all land — they
used to fall through to the capability reply, because `\bcalorie\b` never matches "calories".

## The home screen

It is the supplied screenshot (`assets/home.webp`), dropped in as a photo rather than rebuilt —
it already carries its own status bar and the dimming from the FAB menu. Its **Chat** button is the entry point: the rect was
measured off the image, so the hit area lands exactly on it. **Voice** there does nothing. Because it is a photo, the home trackers are static; the live numbers live in the plan and
in Ria's log cards.

## Colours

Sampled from the supplied screenshots, not guessed: background `#F5F5F5`, cards `#FFFFFF`,
brand green `#20685E`, deep green `#196157`, mint `#39CA97`, hairlines `#E7E7E7`,
muted text `#6E6B65`.

## Files

- `index.html` — guide sidebar host, right-hand buttons and the "What I don't know" pane,
  phone frame, status bar, app + overlay hosts
- `assets/home.webp` — the home screenshot used as the first screen
- `styles.css` — design tokens and components lifted from the deck
- `app.js` — state, nutrition model, screens, sheets, the chat engine and the guide sidebar

## Not built

Photo logging, chat history, the food log screen, recipe pages, profile, day picker, Diet and
Streaks tabs, and fitness planning. Each shows a short toast rather than dead-ending — the
plan's **View recipe** rows are the entry points to pages the app already has. 
