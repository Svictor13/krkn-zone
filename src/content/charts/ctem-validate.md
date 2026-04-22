---
title: "96% Can't Validate Exploitability"
date: 2026-04-24
excerpt: "Your scanner tells you what could be exploited — it doesn't tell you what can be exploited in your environment right now."
image: /images/krkn-ctem-validate.jpg
tags: [CTEM, exploitability, validation]
---

A vulnerability scanner tells you what COULD be exploited.

It doesn't tell you what CAN be exploited. In your environment. Right now.

96% of security teams can't make that distinction.

The result: 42% of SOC time is spent on false urgency. Patching things that attackers can't actually reach. Escalating findings that compensating controls already mitigate. Burning cycles on theoretical risk while real risk sits untouched.

## The 2% That Matters

Only 2% of exposures actually reach critical assets through a viable attack path.

Two percent.

The other 98% is noise your team is drowning in. Not because the vulnerabilities aren't real — they are — but because the conditions required for exploitation don't exist in your specific environment. The port is blocked. The EDR would catch the payload. The asset isn't reachable from any untrusted network. The vulnerability requires local authentication that no attacker has.

Validation is the step most CTEM programs skip. They go from "scan found it" straight to "create a ticket." No check on whether an EDR is blocking the path. No check on whether the asset is reachable from the internet. No check on whether the vulnerability has ever been exploited in the wild.

## Why Teams Skip Validation

They skip it because it's hard. Real validation requires correlating data across multiple tools — your vulnerability scanner, your EDR, your network segmentation data, your asset inventory, your threat intelligence feeds. Most organizations run these tools in silos. The vulnerability team has their console. The SOC has theirs. The network team has theirs. Nobody has the correlated view.

Building that correlated view manually is a nightmare. I've seen teams try it with spreadsheets and SOAR playbooks. It works for about a month, until the first analyst leaves and nobody maintains the logic. Sustainable validation requires a platform that ingests all those data sources continuously and applies correlation logic at machine speed.

## Transparency Builds Trust

When I demo exposure management, the first thing practitioners ask is: "Can I see WHY this one is ranked higher than that one?"

The answer has to be transparent. Not a black box score. Not a number you can't explain to your CISO. Not an AI-generated risk rating with no lineage.

Show the EDR status. Show the network segmentation. Show the EPSS score. Show the CISA KEV status. Show whether the vulnerability has a public exploit or just a theoretical advisory.

Every factor that influences the priority should be visible, auditable, and explainable. Because trust is the currency of CTEM. If your analysts don't trust the prioritization, they'll ignore it and go back to sorting by CVSS. And you'll be right back to patching the 98% instead of the 2%.

## The Organizational Impact

When validation works — when your team can confidently say "these 3,000 findings are the ones that actually matter this week" — something shifts. IT stops pushing back on remediation tickets because they trust the list is real. The CISO stops asking "but are we sure?" because the evidence is attached. And the SOC stops spending half its day chasing phantom urgency.

The 96% statistic isn't a technology problem. It's a trust problem disguised as a data problem. Solve the data correlation, make the logic transparent, and trust follows. Once trust is there, everything downstream — remediation speed, risk reduction, board reporting — gets dramatically easier.

If you can't explain the score, your team won't trust the priority. And if they don't trust it, they won't act on it.
