# TerraNode — Implementation brief (competitive research)

> **Audience:** Agents and developers implementing the MVP.  
> **Authority:** Additive to [README.md](../README.md). When this doc conflicts with README on *scope*, README wins; on *UX polish and positioning*, this doc wins.

**Last updated:** 2026-05-23 (from product research session)

---

## 1. Positioning

### Elevator pitch

TerraNode lets AI operators quantify **arable land debt** (land + water) from GPU infrastructure and **retire** it by funding verified land restoration in Kenya. The public can micro-fund the same projects via simulated M-Pesa.

### Name collision warning

Search results for “Terra node” point to [terra-money/core](https://github.com/terra-money/core) (Cosmos chain). Always subtitle:

> *Land restoration credits for AI compute footprint — not Terra blockchain.*

---

## 2. Landscape — comparable projects

Use these for **UX and flow patterns**, not for copying blockchain stacks into MVP.

### AI environmental footprint calculators

| Project | URL | Steal this pattern |
|---------|-----|-------------------|
| EcoLogits Calculator | https://github.com/mlco2/ecologits-calculator | Expert mode, token/usage estimator, equivalences (“like driving X km”), scaling projection |
| Thirsty AI | http://thirstyai.mgks.dev / https://github.com/mgks/thirsty-ai | **Water as hero metric**, per-action ml costs, rising fluid/water level UI |
| waterforAI | https://github.com/manuelhf/waterforAI | Facility location × **water stress** map/badge |
| Green Algorithms | https://github.com/GreenAlgorithms/green-algorithms-tool | Location-aware grid; show energy separate from location |

**Apply to TerraNode:** Calculator page is the credibility anchor. Dual meters (m² land + L water/year) → combined **Arable Land Debt**. Equivalences are mandatory for demo, not optional copy.

### Carbon registry & retirement UX

| Project | URL | Steal this pattern |
|---------|-----|-------------------|
| UNDP National Carbon Registry | https://github.com/undp/undp-national-carbon-registry | Issue → transfer → **retire** lifecycle; public transparency |
| Toucan Protocol | https://docs.toucan.earth/toucan/retire-credits , https://app.toucan.earth/retirements | Beneficiary + message on retire; **pending → verified**; downloadable certificate |
| Carbonchain | https://github.com/Nishat2006/Carbonchain | Marketplace stats, live pricing ticker, multi-stage verification |

**Apply to TerraNode:** Corporate flow = **retire land debt**, not “buy credits to hold.” Certificate + `/retirements` public list.

### dMRV (digital monitoring, reporting, verification)

| Project | URL | Steal this pattern |
|---------|-----|-------------------|
| IWA dMRV Framework v3 | https://interworkalliance.github.io/TokenTaxonomyFramework/dmrv/spec/index.html | Origination vs distribution; verification effort by project type |
| Model_BlueChain | https://github.com/kritik8/Model_BlueChain | Pipeline UI: satellite → biomass → growth → credits (mock in MVP) |

**Apply to TerraNode:** `verificationScore` on projects already exists in schema — surface it with a **timeline of MRV events** on project detail.

### ReFi crowdfunding / restoration marketplaces

| Project | URL | Steal this pattern |
|---------|-----|-------------------|
| Collective Impact (ICP hackathon winner) | https://github.com/muslimalfatih/collective-impact | Escrow, milestone release, DAO voting, impact tokens |
| agro-regen-ai | https://github.com/lewiii254/agro-regen-ai | Restoration marketplace, milestones, filters, investor dashboard |

**Apply to TerraNode:** Filters + milestones + “AI-funded” badge; optional escrow gates at 25/50/75% (simulated).

---

## 3. Minimum spice (P0) — implement with MVP

These five items differentiate the hackathon demo. **Do not ship MVP without them.**

### 3.1 Calculator enhancements (`/calculator`)

**Presets** (one-click `ComputeProfile`):

| Label | gpuType | gpuCount | uptimeHoursPerDay | coolingType |
|-------|---------|----------|-------------------|-------------|
| Single H100 pod | H100 | 8 | 20 | liquid |
| Inference fleet | H100 | 256 | 12 | air |
| Hyperscaler row | H100 | 10000 | 22 | hybrid |

**Expert mode** (collapsible): expose `LAND_PER_GPU_RACK`, `FACILITY_OVERHEAD`, water L/GPU-hr override — stored in component state only.

**Equivalences** (below `DebtDisplay`):

- `arableLandDebt / 7140` → football fields (approx)
- `annualWater / 150000` → Olympic pools (approx)
- Tagline: *"Carbon markets don't count where your datacenter sits."*

**Shareable URL:** serialize profile to query string; on load, hydrate form; CTA “Offset now” → `/corporate` with debt in query or session.

**Optional scaling block:** “If 1% of daily global inference matched this profile…” — multiply debt by a constant for drama (label clearly as projection).

### 3.2 Retirement certificate (corporate flow)

After simulated payment, show modal + persist transaction:

```
Certificate fields:
- certificateId (e.g. TN-2026-XXXX)
- beneficiaryName (company)
- retirementMessage (max 200 chars, optional)
- creditsRetired, sqmRestored
- projectNames[]
- status: pending | confirmed | verified (start confirmed; can flip to verified in demo mode)
- issuedAt (ISO)
```

**Copy:** Use “Retirement certificate” / “Land debt retired”, not “purchase receipt”.

**PDF/PNG:** stretch — html2canvas + jspdf or print stylesheet.

### 3.3 Public retirements page (`/retirements`)

- Table: date, company, amount, m², projects, status
- Data: `GET /api/transactions?type=corporate-purchase` or Prisma filter
- Empty state: “No retirements yet — be the first” + CTA to calculator
- Link from footer + post-purchase modal

### 3.4 dMRV timeline (project detail `/projects/[id]`)

Mock events array per project (can live in `src/data/projects.ts` or seed):

```typescript
interface MrvEvent {
  date: string;
  stage: 'satellite' | 'biomass' | 'field-audit' | 'credit-issued';
  title: string;
  detail: string;
}
```

Visual: vertical stepper or horizontal timeline; highlight current stage from `status` + `verificationScore`.

### 3.5 Live stats + demo mode

**Stats ticker** (landing + optionally navbar):

- Source: `GET /api/stats` — aggregate `SUM(creditsOrArea)`, `COUNT(transactions)`, `SUM(fundingRaised)`, project count
- Animate with existing `AnimatedCounter`

**Demo mode** (dev/demo only):

- Button in footer or `?demo=1`
- Resets: re-run seed or clear transactions + restore project funding to seed values
- Optional: 90s guided highlights (pointer tooltips) — lowest priority within P0

---

## 4. High polish (P1)

### 4.1 Water-stress badge

Add `src/data/facilities.ts`:

```typescript
{ region: string; stressLevel: 'low' | 'medium' | 'high' | 'extreme'; label: string }
```

When user picks facility location in calculator, show badge (inspired by waterforAI).

### 4.2 M-Pesa simulation depth

- Validate `+254` format
- Steps: phone → STK push toast → PIN modal (4 dots) → 2–3s spinner → success
- **Safaricom-style SMS toast:** “Confirmed. KES X sent to TerraNode. Ref: TN…”

### 4.3 Project card badges

- `AI-funded` if any `corporate-purchase` transaction for `projectId`
- Show `verificationScore` as pill (e.g. “D-MRV 85”)

### 4.4 Micro-funder portfolio (`/portfolio` or section in profile)

- List user’s `micro-fund` transactions from local name key or simple name field
- Map pin summary optional

---

## 5. Stretch (P2) — after P0/P1

- Milestone escrow progress (25/50/75% funding gates with copy from Collective Impact)
- Before/after image slider on project detail
- `GlobeViz` with pins (README optional component)
- Thirsty-AI-style rising water WebGL on calculator (high effort)
- Methodology page citing EcoLogits / waterforAI papers (links only)

---

## 6. Data model extensions (suggested)

Add to Prisma / types when implementing P0:

```typescript
// Extend Transaction or new RetirementCertificate model
retirementMessage?: string;
certificateId?: string;
beneficiaryName?: string;
```

```typescript
// Project seed / data
mrvEvents?: MrvEvent[];
waterStressRegion?: string;
```

Migration optional for hackathon — JSON on transaction metadata field is acceptable if faster.

---

## 7. API routes to add or extend

| Route | Purpose |
|-------|---------|
| `GET /api/stats` | Already exists — ensure returns ticker fields |
| `GET /api/transactions?type=` | Filter corporate vs micro-fund |
| `POST /api/transactions` | Accept `retirementMessage`, `beneficiaryName` for corporate |
| `POST /api/demo/reset` | Demo mode seed reset (guard with `NODE_ENV` or secret) |

---

## 8. UI copy bank

| Context | Preferred copy |
|---------|----------------|
| Hero | Every GPU has a footprint. Restore it. |
| Calculator CTA | Calculate arable land debt |
| Corporate CTA | Retire your debt |
| Success | You retired X m² of arable land debt |
| Public fund | Fund restoration |
| Credits | Land Restoration Credits (LRC) |
| vs carbon | We measure land and water, not CO₂ alone |

---

## 9. Demo script (judges) — align implementation

1. Landing → live ticker shows zeros or seed totals  
2. Calculator → preset “Hyperscaler row” → expert mode peek → equivalences  
3. Offset → Gold tier → pick 2 projects → retirement message → certificate  
4. `/retirements` → row appears  
5. Projects → filter agricultural → Nakuru → M-Pesa $25 → impact summary  
6. Landing ticker updated  

---

## 10. Files likely touched by implementing agent

| Feature | Files |
|---------|--------|
| Presets / expert / URL | `src/app/calculator/page.tsx`, `src/lib/calculator.ts`, `src/components/calculator/*` |
| Certificate | `src/components/corporate/ConfirmationModal.tsx`, `src/app/corporate/page.tsx` |
| Retirements | `src/app/retirements/page.tsx`, `src/app/api/transactions/route.ts` |
| dMRV | `src/app/projects/[id]/page.tsx`, `src/data/projects.ts`, seed |
| Stats ticker | `src/app/page.tsx`, `src/app/api/stats/route.ts` |
| Demo reset | `src/app/api/demo/reset/route.ts`, `prisma/seed.ts` |
| M-Pesa polish | `src/components/funding/MpesaSim.tsx` |
| Water stress | `src/data/facilities.ts`, calculator location select |

---

## 11. Out of scope for this brief

- Real M-Pesa (Daraja), real satellite MRV, on-chain minting — see README §12 post-hackathon
- Terra blockchain / Cosmos validator tooling
- New dependencies unless justified (e.g. pdf export)

---

## 12. Acceptance checklist (P0)

- [ ] Presets + expert mode on calculator  
- [ ] Equivalences visible on results  
- [ ] Shareable calculator URL works  
- [ ] Corporate flow issues retirement certificate with serial ID  
- [ ] `/retirements` lists corporate transactions  
- [ ] Project detail shows dMRV timeline  
- [ ] Landing stats ticker reads from API  
- [ ] Demo reset available  
- [ ] `npm run build` succeeds  
- [ ] README §13 demo script passes manually  
