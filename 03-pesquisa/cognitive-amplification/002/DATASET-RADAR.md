# DATASET-RADAR.md

| DATASET_ID | DOMAIN | N | UNIT | TEMPORAL | BASELINE | EXPOSURE | OUTCOME | TRANSFER | RETENTION | FAILURES_INCLUDED | PUBLIC | LICENSE | RAWNESS | CODE_AVAILABLE | REANALYSIS_POSSIBLE | BIGGEST_LIMITATION |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Liu et al. AI assistance, arXiv:2604.04721 | math/reading | 1,222 | person | repeated short experiments | yes | AI vs control | assisted/unassisted performance, persistence | partial | short-term removal | yes, treatment/control | paper/preprint; data status to audit | arXiv license | study data, not yet verified | materials linked | PARTIAL_REANALYSIS_CANDIDATE | preprint; public data/code status not yet confirmed |
| Grinschgl et al., PMCID PMC8358584 | offloading/memory | experiment sample | person | immediate + unexpected memory | baseline tasks | lockout/offloading | immediate efficiency + later memory | no far transfer | yes, delayed memory | treatment/control | public article; OSF link in record | article-specific | raw data status to verify | materials link | PARTIAL_REANALYSIS_CANDIDATE | simple visual task, not broad capability |
| Chen et al., NCT06511102 / PMCID PMC12255134 | analytical writing | protocol | person | lab RCT | planned | GenAI vs no AI | effort/performance | planned, not confirmed | planned | planned | public protocol | protocol-specific | no results yet | protocol | NO_RESULTS_YET | protocol, no completed outcome |
| OULAD UCI 349 DOI 10.24432/C5KK69 | education | 30k+ students | student/module/assessment | dated assessments + daily VLE | prior assessments | VLE exposure | later assessment/final result | no explicit novel-task transfer | longitudinal within course | failures/withdrawal included | yes | CC BY 4.0 | mixed raw/derived | public scripts vary | PARTIAL_REANALYSIS_CANDIDATE | no randomized external exposure; transfer absent |
| PLOS e0204547 S1 | team collaboration | 65 logs | team/session | event timestamps | prior/context features | collaboration/network | Matrix Solving score | no transfer | no delayed independent task | sessions included, failures limited | supplementary | license/article terms | mixed logs/derived | code associated | PARTIAL_REANALYSIS_CANDIDATE | no direct representational measure; TY publication proxy |
| Human–AI medical videos, PMC9440124 | medical decision | 504 videos/21 endoscopists | person/video | prospective videos | expertise | AI decision support | assisted diagnostic performance | no removal transfer | no retention | difficult cases in sample | article/OSF link | article-specific | videos/labels governed | supplements | PARTIAL | task assistance, not capability acquisition |
| GitHub/GH Archive | software | massive events | developer/repo/event | strong timestamps | prior contributions | collaboration/code review | proxies: PR/issue outcomes | novel task can be defined | retention possible | failures/closed PRs | public event data | source-specific | raw events + derived | extensive tooling | PARTIAL | outcome proxy and confounding by selection |

The strongest candidates are not necessarily the most interesting. They are the ones with timestamps, a baseline, a post-exposure outcome and a defensible denominator.

## References

[1]: https://www.nature.com/articles/s44159-022-00089-1 — Carpenter, Pan & Butler, The science of effective learning with spacing and retrieval practice.
[2]: https://www.annualreviews.org/content/journals/10.1146/annurev-orgpsych-032117-104443 — Transfer of training: The known and the unknown.
[3]: https://www.pnas.org/doi/10.1073/pnas.2005737118 — Riedl et al., Quantifying collective intelligence in human groups.
[4]: https://pmc.ncbi.nlm.nih.gov/articles/PMC12255134/ — Chen et al., Generative AI cognitive effort RCT protocol.
[5]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9440124/ — Reverberi et al., Human–AI collaboration in medical decision-making.
[6]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8358584/ — Grinschgl et al., Cognitive offloading: performance and memory.
[7]: https://arxiv.org/html/2604.04721v2 — Liu et al., AI assistance reduces persistence and hurts independent performance.
[8]: https://mitpress.mit.edu/9780262082310/cognition-in-the-wild/ — Hutchins, Cognition in the Wild.
[9]: https://doi.org/10.1177/2041386614564105 — Burt et al., Social network side of individual innovation.
[10]: https://doi.org/10.5465/amr.1990.4309185 — Cohen & Levinthal, Absorptive Capacity.
[11]: https://doi.org/10.5465/amr.2002.6587995 — Zahra & George, Absorptive Capacity review.
[12]: https://doi.org/10.1002/smj.157 — Ahuja & Katila, Knowledge and innovation.
[13]: https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.989572/full — Janssens et al., Collective intelligence over time.
[14]: https://www.osf.io/ — OSF Registrations and public materials.
[15]: https://archive.ics.uci.edu/dataset/349/open+university+learning+analytics+dataset — OULAD, UCI.
