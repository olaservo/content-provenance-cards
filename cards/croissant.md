---
name: Croissant
type: specification
website: https://github.com/mlcommons/croissant
status: 1.1 (February 2026); required for NeurIPS 2026 dataset submissions
tags: [type/specification, layer/provenance, layer/licensing]
participate: "[GitHub issues](https://github.com/mlcommons/croissant/issues)"
updated: 2026-11-15
---
MLCommons dataset metadata format. 1.1 added machine-actionable provenance, consent and licensing fields.

## Topics
- **Dataset provenance and consent**: recording what a training set was allowed to contain, the dataset-side counterpart to [[c2pa]] for assets.

## In use
- The NeurIPS 2026 Evaluations and Datasets Track required a Croissant file with every dataset submission, including Responsible AI fields ([NeurIPS blog](https://blog.neurips.cc/2026/05/04/responsible-ai-metadata-requirements-for-the-evaluations-and-datasets-track-neurips-2026/), 2026-05-04).
- Hugging Face, Kaggle, OpenML and Dataverse generate a Croissant file for the datasets they host, according to the [NeurIPS 2026 hosting guidelines](https://neurips.cc/Conferences/2026/EvaluationsDatasetsHosting).

## History
- 2026-02: 1.1 released.
