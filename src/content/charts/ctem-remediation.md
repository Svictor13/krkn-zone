---
title: "The Remediation Gap Nobody Talks About"
date: 2026-05-08
excerpt: "If you're not measuring exposure reduction, you're measuring activity — and activity without strategy is just running on a treadmill."
image: /images/krkn-ctem-remediation.jpg
tags: [CTEM, remediation, burndown, patching]
---

Scanning is solved. Prioritization is getting better. Remediation is still broken.

Here's the pattern I see everywhere:

1. Security identifies 200 critical exposures
2. Creates tickets for IT
3. IT closes 180 of them in 30 days
4. Security runs the scan again
5. 160 new critical exposures appeared

Net progress: almost zero.

## The Treadmill Problem

The problem isn't speed. It's strategy.

If you're not measuring exposure REDUCTION, you're measuring activity. And activity without strategy is just running on a treadmill. You're sweating. You're exhausted. You're moving your legs. But you're in the same place you started.

I see this across organizations of every size, from mid-market to Fortune 100, across the US and Latin America. The vulnerability management team reports "we patched 12,000 findings this quarter" and the CISO asks "are we safer?" and nobody can answer with certainty. They can show the tickets closed. They can't show the risk reduced.

This happens because most remediation programs are designed around vulnerability counts, not exposure outcomes. The metric is "findings closed" when it should be "attack surface reduced."

## Three Things That Change the Game

**First, track exposure burndown, not ticket closure.** Did the actual attack surface shrink? This requires measuring the total exploitable exposure before remediation and after, not just counting how many tickets moved to "resolved." A burndown chart that shows trending exposure over time tells you whether your program is winning or treading water.

The difference is profound. Ticket closure can go up while exposure stays flat — because the tickets being closed aren't the ones that matter. Exposure burndown forces you to confront whether the right things are getting fixed.

**Second, group remediations by control improvement.** This is where leverage lives. One firewall rule change might close 40 findings. One network segmentation adjustment might eliminate an entire attack path. One patch campaign across a specific OS version might close 200 findings in a single change window.

When you group by control improvement instead of individual CVE, you find that 20% of the remediation actions produce 80% of the risk reduction. The organizations that figure this out remediate smarter, not harder. They stop chasing individual CVEs and start asking "what's the single action that closes the most exposure?"

**Third, show the before and after.** When the CISO asks "are we safer this quarter?" the answer should be a measurable reduction in exploitable exposure, presented as a trend line, not a single number. "We reduced annualized exposure by 34% this quarter, concentrated in the payment processing environment" is an answer. "We closed more tickets than last quarter" is not.

## Why This Gap Persists

The remediation gap persists because security teams and IT teams are measured differently. Security is measured on findings identified. IT is measured on tickets closed. Neither is measured on exposure reduced.

Until both teams share accountability for outcomes — not outputs — the treadmill continues. Security will keep finding things. IT will keep closing tickets. And the attack surface will stay roughly the same size, just in different places.

This isn't a technology problem. Every major CTEM platform can track burndown, group by control, and show before/after comparisons. The problem is that most organizations never configure those capabilities because the operating model doesn't demand them. The weekly meeting reviews ticket velocity, not exposure trends. The quarterly report shows findings by severity, not risk reduction by business unit.

## Where CTEM Earns Its Budget

This is where CTEM earns its budget. Not in finding problems — every scanner does that. Not even in prioritizing problems — that's table stakes.

CTEM earns its budget by proving you fixed the right ones. By showing that the attack surface is smaller this month than last month. By demonstrating that the remediation effort was concentrated where it produced the most risk reduction.

If your CTEM program can't show that, you have a scanning program with a better name. And the next budget cycle will treat it accordingly.
