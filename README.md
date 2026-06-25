# 🧠 NeuroNav

> **Live app:** [https://neuronav-debug.github.io/neuronav/](https://neuronav-debug.github.io/neuronav/)
> **Repository:** [https://github.com/neuronav-debug/neuronav](https://github.com/neuronav-debug/neuronav)

**A gamified productivity companion built for ADHD and neurodivergent brains.**

NeuroNav lives in a single self-contained HTML file and runs entirely in your browser — no account required, no server, no data leaves your device. Every feature was designed around how ADHD brains actually work: variable energy, rejection sensitivity, time blindness, dopamine-driven motivation, and the need for external structure that feels safe rather than punishing.

---

## ✨ What Makes NeuroNav Different

Most productivity apps assume you can just "start the task." NeuroNav assumes you might need to:

- See exactly one thing at a time (Now/Next/Later Board)
- Regulate your nervous system before you can work (Regulate, Stim Corner, Breathing)
- Have a body double present to feel safe (Body Double Lounge)
- Dump every thought before you can focus (Thought Dump)
- Be rewarded immediately and visibly (XP, levels, shells, duck celebrations)
- Know it's okay to stop and rest (Energy Toolbox, RSD Vault)

---

## 🚀 Getting Started

### Option 1 — Use the live app
Open [https://neuronav-debug.github.io/neuronav/](https://neuronav-debug.github.io/neuronav/) in any modern browser. No setup needed.

### Option 2 — Install as a PWA (recommended)
Open the live app in Chrome or Edge. An **⬇️ Install** button will appear — click it to install NeuroNav as a standalone desktop or mobile app that:

- Works fully offline
- Gets its own window (no browser chrome)
- Appears in your taskbar / home screen
- Auto-updates when you reconnect

### Option 3 — Self-host
```bash
git clone https://github.com/neuronav-debug/neuronav.git
cd neuronav

# Python 3
python -m http.server 8000

# Node.js
npx serve .
```
Then open `http://localhost:8000`

---

## 📁 File Structure

```
neuronav/
├── index.html          # The entire app — all JS, CSS, and HTML in one file
├── manifest.json       # PWA metadata (name, icons, theme, shortcuts)
├── sw.js               # Service Worker — offline caching, background sync
├── pwa.js              # Install prompt handling, update notifications
├── install.html        # Standalone install guide page
├── README.md           # This file
└── icons/
    ├── icon-192x192.png    # App icon (required for PWA install)
    └── icon-512x512.png    # App icon large (required for PWA install)
```

> `index.html` is self-sufficient. The other files add PWA install capability but are not required to use the app.

---

## 🗺️ The World Map

The home screen is an illustrated fantasy map of **The Realm of NeuroNav**. Every feature is a location you can tap to visit. Mapping abstract tasks to physical places helps ADHD brains build spatial memory around habits.

| Territory | Section |
|-----------|---------|
| 🌲 Whispering Wood | Focus Timer |
| 🌅 Dawn Temple | Routines |
| 🔮 Crystal Tower | Stats |
| 🍄 Healing Grove | Regulate |
| 🏡 Cozy Cottage | Quests — Home Base |
| 🛖 Village Market | To-Do |
| 🌸 Bloom Meadow | Habits |
| 📜 Scribe's Nook | Notes |
| 🔭 Sage's Chamber | AI Coach |
| 🐾 Animal Pond | Collectibles |
| 🎮 Puzzle Cavern | Mini-Games |
| ⛰️ Enchanted Peak | Adventures |

---

## ⚡ XP & Level System

Everything you do in NeuroNav earns XP. Levels unlock Adventures and track your growth as a hero.

| Action | XP |
|--------|----|
| Complete a quest | 10–25 XP |
| Finish all daily quests | +50 XP bonus |
| Complete a focus timer session | +30 XP |
| Log a win | +10 XP |
| Use a dopamine boost | +5 XP |
| Complete an adventure | 40–150 XP |

**Level formula:** `Level = floor(Total XP ÷ 100) + 1`

Every 100 XP = 1 level. No level cap.

XP also converts 1:1 to 🐚 **Shells** — the in-app currency used to unlock rare Animal Pond collectibles.

---

## 📋 Features

### Core

**📋 Quests**
A daily quest board that refreshes each morning with a randomized set of micro-tasks. Completing all quests earns a bonus XP reward, confetti, and a duck dance. Quest examples: "Drink a full glass of water," "Set a timer for focused work," "Text a friend."

**✅ To-Do**
A task list with priority levels (Low / Medium / High), categories (Work, Home, Health, Social), and filters. Tasks carry over until completed.

**📝 Notes**
Rich notes with color labels, tags, search, pin-to-top, and a full-screen editor. Supports bold, italic, headings, lists, checkboxes, and quotes. Includes templates: Brain Dump, Daily Plan, Meeting Notes, Feelings Check-in, Idea Capture, Gratitude List.

**🔁 Habits**
Track recurring habits with daily streak counting. Fully customizable — name, emoji, and frequency.

**📅 Calendar**
Add events with color coding. View the current month with event dots per day.

**🏆 Wins Journal**
Log positive things that happened. Quick wins include: Meds, Water, Got up, Ate, One task.

---

### Focus

**⏱️ Focus Timer**
Customizable timer with three modes:
- **Pomodoro** — 25 / 15 / 45 / 5 min presets
- **Flow State** — 45 / 60 / 90 / 30 min presets
- **Micro Focus** — 5 / 3 / 10 / 2 min presets

Bind a specific to-do to the session. Completing earns +30 XP and triggers a celebration.

**🎯 Now/Next/Later Board**
Three columns: Now (do immediately), Next (after Now), Later (safely parked). Keeps working memory clear by externalizing what the brain is trying to juggle.

**👥 Body Double Lounge**
Simulated co-working with a virtual buddy (Alex, Mia, Sam, Zoe, Luca, Nova). Set session duration (25 / 50 / 90 min), describe what you're working on, and start. Logs past sessions.

**🔬 Task Breakdown**
Break any overwhelming task into numbered micro-steps. One-tap quick-start examples: Write a report, Clean kitchen, Reply to emails, Exercise, Pay bills.

**🧹 Thought Dump**
Empty your brain before working. Tag dumps (Anxious, Idea, To-do, Vent, Random), save them, convert them to tasks, or clear them. Nothing is lost.

**🌅 Routines**
Build step-by-step checklists for any repeating context — mornings, wind-downs, work starts. Streak tracking per routine. Includes Morning Routine and Wind-Down Routine defaults.

---

### Wellbeing

**🧰 Regulate**
Nervous system tools organized by state:
- 😵 **Overwhelmed** — box breathing, cold water, 5-4-3-2-1 grounding, heavy input, reduce stimuli, safe stim
- 🪫 **Shutdown** — micro-move, warm drink, familiar music, 1-task-only, body scan, natural light
- ⚡ **Hyperfocus** — body check, exit timer, parking lot note, transition ritual, hydrate, stretch
- 😰 **Anxious** — physiological sigh, safety scan, name-it labeling, worry dump, cold splash, RSD check
- 😑 **Understimulated** — novelty inject, movement, add challenge, interest bridge, dopamine menu, learn something

**🌡️ Sensory Check-In**
Rate 6 sensory channels (Sound, Light, Touch, Crowds, Temperature, Internal Buzz) on 0–10 sliders. Logs snapshots over time to reveal patterns. Warns when overall load is high.

**🫀 Body Check-In**
Hourly reminders to check: Did I drink water? Eat? Move? Bathroom? Log a full body scan. Tracks which needs are overdue.

**🌀 Stim Corner**
Interactive sensory tools:
- 🫧 Bubble Wrap — virtual pop sheet (pop individually or pop all)
- 🎛 Satisfying Sliders — drag resistance sliders with no goal
- ✏️ Pattern Draw — draw freehand patterns on canvas
- 🟣 Squish Ball — tap counter with daily total

**🧭 Time & Energy Toolbox**
- **Transition Helper** — countdown timer (5/10/15/30 min) with early warnings so transitions aren't sudden
- **Time Sense Trainer** — guess how long a task will take, then time it; calibrates time perception over time
- **Overwhelm Log** — log intensity, triggers, and what helped; view patterns over time
- **Energy-Matched Task Picker** — filter your task list by current capacity (🪫 Low / 🔋 Medium / ⚡ High)
- **Decision Fatigue Helper** — list 2–6 options, let the app randomly pick one

**🥗 Nutrition & Hydration**
Track water intake with a glass counter (customizable daily goal). Log meals with a single tap — no calorie counting. Medication tracker with daily check-off. Low-effort meal ideas (zero-prep, 5-min, one-hand, no cooking). Weekly meal planner with recipe book and macro info. Mark recipe favorites.

**💜 RSD Vault**
Log rejection sensitivity episodes with intensity rating (1–4). Request an AI reframe. Review past entries to see that you always get through it.

**⚡ Dopamine Boost**
Four categories of dopamine-friendly activities by time available (Instant 0–2 min, Quick 5–10 min, Medium 15–30 min, Deep 1+ hr). Tap to log (+5 XP). Tracks use count per activity.

**🤖 AI Coach**
Anthropic-powered ADHD coach (claude-sonnet-4-6). Context-aware: knows your level, streak, mood, and quest progress. Includes:
- Breathing exercises (Box 4-4-4-4, Calm 4-7-8, Quick 3-3-3)
- Ambient focus sounds (rain, forest, ocean, white noise — Web Audio API synth)
- Quick prompts: "I can't start tasks," "I'm overwhelmed," "Help me focus," "Give me a morning routine," "I'm feeling rejected," "Explain my ADHD"

**📈 Weekly Insights**
Charts for mood trend, XP per day, overwhelm frequency, habit consistency, and wins. Filter by 7 days or 30 days.

---

### Progress & Fun

**📊 Stats**
Full hero dashboard: level, XP progress ring, streak flame, total XP, wins logged, focus minutes, sessions, tasks done, notes count, 7-day XP bar chart, mood history, achievements grid.

**⛰️ Adventures**
Level-gated story quests in cozy fantasy style. Each presents a narrative scene with 2–3 choices — no wrong answers, just different paths. Completing earns XP and a celebration.

| Adventure | Unlocks |
|-----------|---------|
| 🌬️ The First Breath | Level 1 |
| 🌫️ The Brain Fog Forest | Level 2 |
| 🐉 The Distraction Dragon | Level 3 |
| ⚗️ The Energy Potion Riddle | Level 4 |
| 🏪 The Overwhelm Market | Level 5 |
| 🏗️ The Unfinished Tower | Level 7 |
| 🌠 The Star Cartographer | Level 10 |

**🐾 Animal Pond**
Collect 26 kawaii animal companions across 6 species (ducks, bunnies, cats, foxes, frogs, hedgehogs). Common animals appear during celebrations; rare ones unlock with shells. Visit the Pond Habitat to see all collected friends.

**🎮 Brain Games**
- **⚡ Focus Blaster** — tap distractions (phone, notifications, TV, snacks, stray thoughts) before they escape. 3 lives, wave-based.
- **🧠 Memory Match** — emoji pairs card flip (2×4 Easy, 3×4 Medium, 4×4 Hard)

**📖 Strategy Hub**
Library of evidence-based ADHD strategies, filterable by: Lifestyle, Productivity, Social, Fun, Therapy, Emergency.

**🔄 Weekly Reset**
10-item structured weekly review checklist. Completing it earns XP and the Fresh Start achievement.

---

## 🏅 Achievements

| Icon | Achievement | How to Earn |
|------|-------------|-------------|
| 👶 | First Steps | Complete your first quest |
| 🔥 | Momentum | Complete 5 quests in one day |
| 👑 | Champion | Complete all daily quests |
| 📝 | Win Logger | Log your first win |
| ⏱️ | Time Keeper | Complete a focus timer session |
| 📝 | Note Taker | Create a note |
| ✅ | Task Master | Add a to-do |
| 📅 | Planner | Add a calendar event |
| ✅ | List Lover | Complete 5 to-dos |
| ⭐ | Rising Star | Reach Level 5 |
| 💎 | NeuroNav Legend | Reach Level 10 |
| 🌍 | Realm Walker | Reach Level 15 |
| 👑 | NeuroNav Master | Reach Level 20 |
| 🔥 | On Fire | Maintain a 3-day streak |
| 🔄 | Fresh Start | Complete weekly reset |
| ⏳ | Time Bender | Try the Time Sense Trainer |
| 🌊 | Self-Aware | Log an overwhelm entry |
| 🆘 | Self-Care Hero | Use Emergency Mode |
| 🤖 | Talked It Out | Chat with the AI Coach |
| ⛰️ | First Steps (Adventure) | Complete your first adventure |
| 🗺️ | Adventurer | Complete 3 adventures |
| 🌟 | Legendary Explorer | Complete all adventures |

---

## 🔧 Technical Details

### Architecture
- **Single-file HTML app** — all CSS, JavaScript, and HTML inline in `index.html`
- **Vanilla JS** — no frameworks, no build step, no dependencies
- **localStorage** — all data stored locally, namespaced per user account
- **Client-side auth** — local username/password, no external server
- **Web Audio API** — ambient focus sounds generated in-browser, no audio files needed
- **Anthropic API** — AI Coach calls `claude-sonnet-4-6` directly from the client

### PWA Files

| File | Purpose |
|------|---------|
| `manifest.json` | App name, icons, theme colour, display mode, home screen shortcuts |
| `sw.js` | Service Worker — stale-while-revalidate cache strategy, offline fallback, background sync |
| `pwa.js` | `beforeinstallprompt` handling, install banner, floating install button, update toast |

### Data Storage
All data lives in `localStorage` under user-namespaced keys. Nothing is sent to any server except AI Coach messages (Anthropic API). To export: **Settings → Export My Data** (downloads JSON). To restore: **Settings → Import Data**.

### Browser Support

| Browser | Notes |
|---------|-------|
| Chrome (desktop/Android) | Full support including PWA install |
| Edge | Full support including PWA install |
| Firefox | Full support, PWA install varies by OS |
| Safari (iOS 16.4+) | Full support, install via Share → Add to Home Screen |
| Safari (macOS) | Full support, no PWA install prompt |

---

## 📱 Install Guide

### Windows / macOS / Linux — Chrome or Edge
1. Open [https://neuronav-debug.github.io/neuronav/](https://neuronav-debug.github.io/neuronav/)
2. Look for the **⬇️ Install** button at the bottom of the screen
3. Click → Install
4. NeuroNav opens in its own window with a taskbar / dock icon

Manual install: **⋮ menu → Cast, save and share → Install page as app**

### iPhone / iPad — Safari
1. Open the app in Safari
2. Tap the **Share** button (⬆️)
3. Scroll down → **Add to Home Screen** → Add

### Android — Chrome
1. Open the app in Chrome
2. Tap **⋮** → **Add to Home screen** or **Install app** → Install

---

## 💜 Design Philosophy

**Cozy, not clinical.** ADHD tools often feel like medical devices or corporate task managers. NeuroNav feels like a friendly fantasy world you want to return to.

**Celebrate everything.** ADHD brains are chronically under-rewarded by standard productivity systems. Every small action earns something — XP, shells, a duck doing a little dance, confetti.

**No shame, no failure.** Quests reset daily. Adventures have no wrong answers. Missing days doesn't delete history. The Wins Journal and RSD Vault exist to remind you that hard things happen and you always survive them.

**External structure that feels safe.** The Now/Next/Later board, Thought Dump, and Task Breakdown exist because ADHD brains need systems to offload working memory — the app holds the information so your brain doesn't have to.

**Everything optional.** Use the features that work for you. Ignore the rest. NeuroNav never nags.

---

**Made with 💜 for ADHD brains.**
