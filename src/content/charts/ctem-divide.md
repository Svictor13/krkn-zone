---
title: "The 84/16 Divide"
date: 2026-04-22
excerpt: "87% of security leaders say CTEM is important — only 16% have actually implemented it, and the gap isn't about awareness."
image: /images/krkn-ctem-divide.jpg
tags: [CTEM, exposure-management, Gartner]
---

87% of security leaders say CTEM is important.

16% have actually implemented it.

That gap isn't about awareness. Everyone read the Gartner prediction. Everyone agrees that managing exposure continuously is better than quarterly scans and annual pen tests. The concept sells itself. The execution doesn't.

## The Real Blocker

Who owns CTEM on Monday morning? When a new CVE drops, who decides it matters? When the scan produces 62 million findings, who reduces that to the 150,000 that are actually exploitable?

In my experience deploying CTEM across enterprises in the US and Latin America, the blocker is never the technology. It's the operating model. Organizations buy platforms and expect them to solve organizational problems. They don't. Platforms are accelerators. They accelerate whatever you already have — including dysfunction.

You need three things to close the divide:

- **An integration layer** that normalizes data from every scanner, EDR, and cloud tool you already own
- **A prioritization engine** that goes beyond CVSS to account for exploitability, reachability, and business context
- **A remediation workflow** that IT teams actually trust enough to act on

Most organizations have the first. Few have the second. Almost nobody has the third.

## Why the Third Piece Kills Programs

That third piece — the remediation workflow — is where CTEM programs live or die. And it fails for a predictable reason: security teams design it without IT operations at the table.

I've watched this play out dozens of times. Security buys a platform, configures it, builds dashboards, and then starts firing tickets at IT. The tickets lack context. They don't explain business impact. They don't group related findings into a single actionable campaign. They just say "patch this" with a severity score attached.

IT looks at the queue, sees 300 new tickets this week on top of 1,200 from last month, and starts triaging by what's easiest to close — not what actually reduces risk. That's rational behavior from their perspective. They're being measured on ticket closure, not exposure reduction.

## Closing the Gap

The organizations in the 16% didn't get there by buying better tools. They got there by designing a workflow where security and IT share accountability for outcomes. Security owns prioritization. IT owns remediation. And both are measured against the same metric: did the actual attack surface shrink?

That sounds simple. It's brutally hard to implement because it requires changing how two teams that have been adversarial for years start collaborating. It requires shared SLAs, shared dashboards, and shared consequences.

But that's the difference between the 87% who agree CTEM matters and the 16% who are actually doing it. Agreement is easy. Execution requires organizational change, not just technical deployment.

The question worth asking isn't "should we do CTEM?" — everyone already answered yes. The question is: which of the three pieces is your biggest gap, and who in your organization is accountable for closing it?
