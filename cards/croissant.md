---
name: Croissant
type: specification
website: https://github.com/mlcommons/croissant
news: https://mlcommons.org/tag/croissant/
feed: https://mlcommons.org/tag/croissant/feed/
status: 1.1 published 2026-01-29 and announced 2026-02-12; required for NeurIPS 2026 dataset submissions
tags: [type/specification, layer/provenance, layer/licensing, medium/data]
contribute: "[GitHub issues](https://github.com/mlcommons/croissant/issues)"
updated: 2026-11-20
---
MLCommons dataset metadata format. 1.1 added machine-actionable provenance, consent and licensing fields.

## Topics
- **Dataset provenance and consent**: recording what a training set was allowed to contain.

## Compare
- The dataset-side counterpart to [[c2pa]] for assets. The only mention found is a contributor's remark on [Croissant issue 885](https://github.com/mlcommons/croissant/issues/885) (searched 2026-11-15).

## In use
- The NeurIPS 2026 Evaluations and Datasets Track required a Croissant file with every dataset submission, including Responsible AI fields ([NeurIPS blog](https://blog.neurips.cc/2026/05/04/responsible-ai-metadata-requirements-for-the-evaluations-and-datasets-track-neurips-2026/), 2026-05-04).
- Hugging Face, Kaggle, OpenML and Harvard Dataverse generate a Croissant file for the datasets they host, according to the [NeurIPS 2026 hosting guidelines](https://neurips.cc/Conferences/2026/EvaluationsDatasetsHosting).

## History
- 2026-02-12: MLCommons announced 1.1.
- 2026-01-29: 1.1 specification published.
