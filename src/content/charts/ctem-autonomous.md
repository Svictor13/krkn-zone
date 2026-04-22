---
title: "Autonomous Doesn't Mean Unattended"
date: 2026-05-06
excerpt: "The AI handles the 98% that's noise — you handle the 2% that's signal, and that's the right division of labor."
image: /images/krkn-ctem-autonomous.jpg
tags: [CTEM, AI, automation, agentic]
---

The word "autonomous" is everywhere in CTEM right now.

Autonomous scanning. Autonomous prioritization. Autonomous remediation.

Let me be clear about what autonomous should mean in exposure management: the system handles correlation, reasoning, and prioritization so your team can focus on decisions and actions.

It does NOT mean: set it up and walk away.

## What Works

I've seen autonomous CTEM work well when it's designed as amplification, not replacement. Here's what that looks like in practice:

- **40+ AI agents running continuously** to correlate findings across scanners, EDR, and cloud tools. These agents don't just aggregate — they reason about relationships between findings, identify attack paths, and collapse thousands of related vulnerabilities into actionable campaigns.
- **Agentic workflows that auto-create tickets** when critical exposures meet specific criteria. Not every finding. Not a fire hose. Only the findings that cross defined thresholds of exploitability, asset criticality, and exposure.
- **Continuous re-prioritization** as the threat landscape changes. When a new exploit drops, the system re-evaluates every related finding across the environment in minutes, not days.

This is what autonomous should mean: machine-speed correlation and reasoning applied to human-defined criteria. The machines do what they're good at — processing millions of data points, finding patterns, maintaining state across time. The humans do what they're good at — making judgment calls about business context, risk appetite, and resource allocation.

## What Fails

I've also seen autonomous CTEM fail spectacularly. The failure pattern is always the same: someone confuses automation with abdication.

**"We turned on the automation and stopped looking at it."** This is the most common failure. The platform is configured, the integrations are built, the dashboards are live. And then nobody looks at them. The assumption is that if nothing is alerting, everything is fine. But the platform might not be alerting because the thresholds are wrong, or the integrations broke, or the data source changed its schema.

**Tickets auto-created with no context, flooding IT queues.** This destroys the trust relationship between security and IT faster than anything else. If IT gets 200 auto-generated tickets on Monday morning with nothing but a CVE number and a hostname, they'll start ignoring the queue. And once they start ignoring it, you've lost the remediation channel.

**Risk scores that change daily with no explanation.** When the priority of a finding flips from critical to medium and back to critical within a week, and nobody can explain why, the team stops trusting the system. Autonomous re-prioritization only works when every score change has a traceable reason: new exploit published, compensating control deployed, asset reclassified.

## The Right Division of Labor

Autonomous CTEM works when the human stays in the loop for three things:

**Defining what matters (scoping).** The AI can discover assets and findings across your entire environment. But deciding which business units, which asset tiers, which risk thresholds constitute "critical" — that's a human judgment call that reflects business strategy.

**Validating the priorities make sense (trust).** Periodically — weekly, at minimum — someone with security expertise needs to review the top priorities and confirm they align with reality. Not because the AI is wrong, but because the AI's inputs might be stale, incomplete, or misconfigured.

**Deciding where to invest (budget).** When the system tells you it would take $2M and 6 months to remediate all critical exposures, and you have $500K and 90 days, a human decides what gets funded. The AI can model the options, but the decision is human.

## The 98/2 Rule

The AI handles the 98% that's noise. You handle the 2% that's signal.

That's the right division of labor. Not autonomous in the sense of unsupervised. Autonomous in the sense of self-operating within human-defined boundaries.

The organizations getting this right across the US and Latin America aren't the ones with the most automation. They're the ones who drew the clearest line between what the machine decides and what the human decides. That line is the difference between a CTEM program that scales and one that collapses under its own automation.
