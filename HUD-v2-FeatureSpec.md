# HUD v2 — Feature Spec
**Source:** Stefan's voice memo, Apr 22, 2026
**Status:** Planned

---

## Problem 1: Input Friction (Voice → Assistant)

**Current flow:** Record voice memo → find recording → copy transcript → paste into Claude prompt
**Desired flow:** Speak → it reaches the assistant → gets processed

### Solution Options:
- Apple Shortcut: one-tap record → transcribe → webhook to Supabase inbox
- Plaud Note integration (existing skill)
- WhatsApp voice message → transcription pipeline
- Siri Shortcut that appends transcription to a Supabase "inbox" table

---

## Problem 2: Session Continuity (Lost Responses)

**Problem:** Start a request, get interrupted, response is lost in scroll. Can't pick up from phone. Can't see it later unless it became a task.

### Solution: HUD Inbox
- New "Inbox" context or standalone section
- Cards showing: what was asked, what the response was, status (pending/answered/actioned)
- Unfinished requests automatically land here
- Accessible from any device via krkn.zone/hud
- Each card can be converted to a task, archived, or linked to a deal/project

---

## Problem 3: Conversation History by Subject

**Problem:** Want to see the full thread of a topic (deal, project) across sessions. Current state + history of changes + documents generated. Like Salesforce opportunity history but better.

### Solution: Subject Threads
- Each deal/project/topic gets a thread view
- Thread shows: current state (top), timestamped history entries, linked documents/artifacts
- Searchable, filterable by date range
- Brief view (latest status) vs expanded view (full history)
- Model after: Salesforce opportunity history + email thread, but cleaner

### Data model extension:
```
threads table:
  id, subject, type (deal/project/personal), 
  current_status, last_updated

thread_entries table:
  id, thread_id, timestamp, source (voice/chat/email/meeting),
  content, artifacts (links to docs/files), 
  action_taken, created_by
```

---

## Design Principles (from Stefan)
- History should be scannable — see current state first, drill into history
- Documents and communications attached to the thread, clickable
- Must work from phone while driving (voice input) and from desktop (full interface)
- Interface should make sense of history, not just display it chronologically
- Unfinished items should be impossible to lose
