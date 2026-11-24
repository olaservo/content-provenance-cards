---
name: Machine Payments Protocol
aliases: [MPP, draft-httpauth-payment, draft-ryan-httpauth-payment]
type: specification
website: https://paymentauth.org
status: Individual IETF draft, draft-httpauth-payment-01 (2026-09-09), active on Datatracker; the earlier draft-ryan-httpauth-payment expired 2026-09-19 (read 2026-11-16); not a WG item
contribute: "[GitHub issues](https://github.com/tempoxyz/mpp-specs/issues)"
tags: [type/specification, layer/payments]
updated: 2026-11-23
---
Stripe and Tempo protocol: HTTP 402 with a `Payment` authentication scheme, payment-method agnostic, with an MCP transport. Filed at the [[ietf]].

## Topics
- **Method-neutral HTTP payment**: one auth scheme for any payment method, an alternative to [[x402]].

## Compare
- [draft-nottingham-httpbis-402](https://datatracker.ietf.org/doc/draft-nottingham-httpbis-402/), an individual draft that defines semantics for the 402 status code, does not mention MPP (read 2026-11-23).

## In use
- Amazon Bedrock AgentCore payments, generally available since August 2026, pays MPP and x402 sellers ([AWS, 2026-11-19](https://aws.amazon.com/blogs/machine-learning/enable-ai-agents-to-pay-for-aws-marketplace-x402-products-with-amazon-bedrock-agentcore-payments/)).
