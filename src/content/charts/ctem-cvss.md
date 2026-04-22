---
title: "Your CVSS 9.8 Doesn't Matter"
date: 2026-05-01
excerpt: "Severity is not urgency — a CVSS 6.1 under active exploitation on an exposed host matters more than a theoretical 9.8 behind three firewalls."
image: /images/krkn-ctem-cvss.jpg
tags: [CTEM, CVSS, EPSS, prioritization]
---

I know that sounds wrong. Let me explain.

A CVSS 9.8 from 2019 that nobody has ever exploited, on a server behind three firewalls with an active EDR, is not your priority.

A CVSS 6.1 from last week that's in the CISA KEV catalog, on an internet-facing host without endpoint protection, IS your priority.

CVSS measures theoretical severity. Real-world risk requires four more dimensions.

## The Five Dimensions of Real Priority

**CVSS** — the base severity score. It tells you how bad the vulnerability could be under worst-case conditions. It's a starting point, not an answer.

**EPSS** — the Exploit Prediction Scoring System. Will this vulnerability be exploited in the next 30 days? Only about 5% of CVEs have meaningful probability. The other 95% are theoretical. EPSS gives you a data-driven way to separate likely threats from possible ones.

**CISA KEV** — the Known Exploited Vulnerabilities catalog. Is someone actively exploiting this right now, in the real world? If a CVE is on the KEV list, it's not theoretical anymore. It's confirmed hostile activity.

**Compensating controls** — is the host protected by EDR? Is it segmented properly? Has it been patched recently for related vulnerabilities? A CVSS 9.8 on a host with full endpoint protection, network segmentation, and no internet exposure is a different animal than the same CVE on a naked host in the DMZ.

**Business context** — does this server process payments? Store PII? Support critical operations? A vulnerability on a development sandbox and the same vulnerability on a payment processing server have the same CVSS score but wildly different business impact.

When you combine all five, the priority list looks nothing like the CVSS-sorted spreadsheet your scanner produces.

## The Quarter Wasted on the Wrong Targets

I've watched teams spend entire quarters patching CVSS 9.8s that nobody was exploiting while ignoring CVSS 6.1s that were actively under attack. They weren't incompetent. They were following the process they were given: sort by severity, work from the top.

That process made sense when CVSS was the only signal available. It doesn't make sense anymore. We have EPSS data. We have the KEV catalog. We have EDR telemetry and network topology. We have asset criticality ratings. Ignoring all of that to sort by a single number is like diagnosing a patient using only their temperature.

The teams I work with across the US and Latin America that break out of this pattern share one trait: they stopped asking "how severe is this vulnerability?" and started asking "how likely is this vulnerability to be exploited on this specific asset, given our current controls?"

That's a fundamentally different question. And it produces a fundamentally different priority list.

## The Spreadsheet Trap

Here's what typically happens. The vulnerability management team exports findings, sorts by CVSS descending, and sends the top 500 to IT. IT patches them. The next scan reveals 400 new findings in the top 500. The team patches those. Repeat forever.

Nobody asks whether the assets being patched are the ones that matter. Nobody checks whether compensating controls already mitigate the risk. Nobody correlates the scanner output with threat intelligence to see which vulnerabilities have actual exploit code circulating.

The spreadsheet becomes the program. And the spreadsheet only knows one dimension: CVSS.

Breaking out of the spreadsheet trap requires a platform that can ingest all five dimensions, correlate them automatically, and present a priority list that reflects real-world risk. But it also requires something harder — convincing your team to stop trusting the number they've relied on for 15 years.

## Severity Is Not Urgency

This is the one-sentence version of everything above: severity is not urgency. A vulnerability can be maximally severe and minimally urgent. A vulnerability can be moderately severe and critically urgent.

The sooner your team learns that distinction — really internalizes it, not just agrees with it in a meeting — the sooner your CTEM program starts reducing actual risk instead of chasing theoretical severity.

Your CVSS 9.8 might matter. But you won't know until you check the other four dimensions. And if you're not checking them, you're guessing. CTEM doesn't guess.
