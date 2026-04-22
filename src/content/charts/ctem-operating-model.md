---
title: "CTEM Is a Framework, Not an Operating Model"
date: 2026-04-29
excerpt: "Gartner gave us 5 stages — none of them tell you who does what on Monday morning."
image: /images/krkn-ctem-operating-model.jpg
tags: [CTEM, operations, Gartner]
---

Gartner gave us 5 stages: Scope, Discover, Prioritize, Validate, Mobilize.

None of them tell you who does what on Monday morning.

That's the gap I see in every implementation.

## The Handoff Problem

Security identifies the exposure. Great. Now what?

Does the ticket go to IT ops? To the cloud team? To the app team? Who decides the SLA? Who tracks that the patch actually reduced the risk, not just closed the ticket?

These aren't edge cases. These are the questions that determine whether your CTEM program produces outcomes or produces dashboards. I've deployed CTEM across enterprises in the US and Latin America, and the pattern is consistent: the framework is adopted in weeks, the operating model takes months. If it happens at all.

The organizations that make CTEM work don't just buy a platform. They design an operating model around it:

- **Security owns prioritization.** They define what matters, using exploitability, business context, and threat intelligence — not just scanner output.
- **IT owns remediation.** They execute the fixes on their timeline, with SLAs that both teams agreed to.
- **The platform measures whether risk actually went down.** Not whether tickets closed. Whether exposure decreased.

That last part is critical. "Ticket closed" is not the same as "exposure reduced."

## The 500-Server Lesson

I've seen teams patch 500 servers and not move the risk needle because the 3 servers that actually mattered were in a different queue. They hit their SLA. They closed their tickets. They reported 100% remediation within the agreed timeframe. And the attack surface didn't change.

This happens because the operating model measured the wrong thing. It measured activity instead of impact. The security team threw findings over the wall, IT caught them and processed them in order, and nobody checked whether the right findings were getting fixed first.

A functioning operating model prevents this by connecting three links in a chain: the finding, the fix, and the business impact. If any link is broken, you're just scanning faster.

## Building the Model

Here's what the operating model actually needs to define, and what Gartner's five stages intentionally leave open:

**Escalation paths.** When a critical exposure is found on a production system that IT can't patch without downtime, who makes the call? Security can't authorize the outage. IT can't assess the risk. The operating model needs a pre-defined escalation that doesn't require a three-day email chain.

**Shared metrics.** Security and IT need to report against the same dashboard. If security measures "findings identified" and IT measures "tickets closed," they'll both hit their targets while actual risk stays flat. The shared metric should be exposure reduction over time.

**Feedback loops.** When IT patches a finding and the next scan shows it's still exposed, the operating model needs to route that back automatically — not wait for the next quarterly review. CTEM is continuous. The operating model has to be continuous too.

**Scope governance.** Gartner's first stage is "Scope," but who decides scope in practice? Is it the CISO? The business unit leaders? The compliance team? If scope isn't governed, it either grows until it's unmanageable or shrinks until it's meaningless.

## Framework vs. Reality

The five-stage framework is valuable. It gives organizations a shared vocabulary and a logical sequence. But frameworks describe what to do, not how to do it. The "how" is the operating model — the roles, the handoffs, the metrics, the escalations, the feedback loops.

If you've adopted CTEM and aren't seeing results, don't blame the framework. Look at the operating model. Look at who owns what on Monday morning. If you can't answer that question clearly, you don't have a CTEM program. You have a CTEM aspiration.

CTEM works when the operating model connects the finding to the fix to the business impact. If any link is broken, you're just scanning faster.
