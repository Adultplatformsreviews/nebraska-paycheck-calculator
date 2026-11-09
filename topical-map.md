# Nebraska Paycheck — Topical Map (no cannibalization)

| URL | Primary KW (owned) | Secondary KWs (only here) | Intent |
|---|---|---|---|
| `/` index.html (pillar) | nebraska paycheck calculator, paycheck calculator nebraska | salary paycheck, biweekly/weekly/semi-monthly/monthly, take-home pay, net pay calculator, paycheck with taxes, deductions/401k/HSA/FSA, FICA, local tax $0, Omaha/Lincoln, ADP comparison | General take-home estimate |
| `/hourly.html` (child) | nebraska hourly paycheck calculator | hourly wage after taxes, $15/$20 an hour after taxes NE, minimum wage context, overtime, part-time | Hourly-wage users |
| `/tax.html` (child) | nebraska income tax withholding calculator (nebraska paycheck tax / income tax calculator) | W-4N allowances, Circular EN percentage method, NE brackets 2.26–4.60%, withholding vs 1040N | State withholding deep dive |

## Rules
- Salary, biweekly, and net pay / deductions are **sections of index.html**, with no separate URLs, so they don't compete with the pillar.
- Each page has a self-referencing canonical, a unique H1, title, and meta. Child pages link up to `/` with the anchor "Nebraska paycheck calculator". The pillar links down with "Nebraska hourly paycheck calculator" and "Nebraska income tax withholding guide".
- Only the pillar uses the phrase "Nebraska paycheck calculator" in its H1 or title. hourly.html and tax.html mention it only as a link back.
- The footer links all three pages.
- Future additions are allowed only for a distinct intent. Bonus withholding, a pay-stub reading guide, 401(k) deposit math, Social Security benefits, overtime withholding, Form 1040N versus withholding, Circular EN as a booklet, and a Nebraska vs Iowa paycheck comparison are separate rows below. Add any further row here first.

## Link graph (internal linking v2, Nov 2026)

**Global on every page:** nav at the top: Home | Hourly | Tax | Guides (relative links, `aria-current` on the active page). The footer links Home, Hourly calculator, Tax withholding, Blog hub, and 3 top posts (take-home, brackets, minimum wage). Before the footer, each page has a "Related guides" box with 3–5 links. Every box has a different mix of links, and the anchors are descriptive and varied.

**Pillar ↔ children:** index ⇄ hourly · index ⇄ tax (contextual body links + nav + related box) · hourly → tax (second job / W-4N)

**Related-box edges (in addition to nav/footer):**
| From | To (anchor) |
|---|---|
| index | hourly ("Nebraska hourly paycheck calculator"), tax ("Nebraska income tax withholding guide"), take-home, fica, omaha-lincoln |
| hourly | index ("salary paycheck calculator for Nebraska"), min-wage, tax ("state withholding calculator"), take-home |
| tax | index ("full Nebraska take-home pay calculator"), brackets, w4n, state-tax-rate, payroll |
| brackets | tax, state-tax-rate, w4n, hub |
| state-tax-rate | tax, brackets, w4n, hub |
| w4n | tax, brackets, state-tax-rate, hub |
| min-wage | hourly ("calculate take-home at $15.26 an hour"), take-home, omaha-lincoln, hub |
| take-home | index ("Nebraska take-home pay calculator"), fica, min-wage, hub |
| payroll | index, fica, w4n, hub |
| fica | index, payroll, take-home, hub |
| omaha-lincoln | index, hourly, min-wage, hub |
| blog hub | lists all 21 posts + index, hourly, tax |

**Clusters:**
- Tax: brackets ⇄ state-tax-rate ⇄ w4n ⇄ tax.html, a full triangle with tax.html at the centre
- Wage: min-wage ⇄ hourly
- Net pay: take-home ⇄ index · payroll ⇄ fica ⇄ index · omaha-lincoln → index (index links back to omaha-lincoln)

**Guardrails:** Only the pillar receives the exact anchor "Nebraska paycheck calculator" (it appears in the hub box and the existing body links). Each page has at most about 5 related links plus the global nav/footer. No page links to every post except the hub.

Canonical host: https://www.nebraskapaycheckcalculator.com/ (www is the Google Search Console property).

## Blog (/blog/) — informational intent only; never "calculator" in H1/title
| URL | Primary KW (owned) | Links to | Intent |
|---|---|---|---|
| `/blog/` blog/index.html | nebraska pay & tax guides (hub) | all posts, /, /hourly, /tax | Hub |
| `/blog/nebraska-income-tax-brackets.html` | nebraska tax brackets 2026, nebraska tax brackets 2027 | filing-status thresholds, 2026 vs 2027, phase-in | Bracket table |
| `/blog/nebraska-state-tax-rate.html` | nebraska state tax rate | effective rate, sales tax, local sales tax, no local wage tax | Overall rate and burden |
| `/blog/nebraska-minimum-wage.html` | nebraska minimum wage 2027 | /hourly.html, / | $15.26 wage facts |
| `/blog/nebraska-take-home-pay.html` | nebraska take home pay (explainer) | /, /hourly.html | Gross vs net concepts |
| `/blog/omaha-lincoln-paycheck.html` | omaha paycheck (city cost context), lincoln | /, /hourly, /tax | City guide, not a calculator |
| `/blog/nebraska-payroll-taxes.html` | nebraska payroll taxes | /, /tax.html | Employer vs employee |
| `/blog/nebraska-w4n-allowances.html` | nebraska w-4n allowances | /tax.html, / | Form how-to |
| `/blog/fica-social-security-medicare-paycheck.html` | fica on nebraska paycheck | / | SS/Medicare explainer |
| `/blog/nebraska-pay-stub.html` | how to read a nebraska pay stub | /, /tax, fica, payroll, overtime, bonus, 401k | Stub columns and labels |
| `/blog/nebraska-bonus-tax.html` | nebraska bonus tax / supplemental wages | /, /tax, pay stub, fica, overtime, 1040n | Separate bonus withholding |
| `/blog/401k-nebraska-paycheck.html` | 401(k) on a nebraska paycheck | /, /hourly, /tax, fica, take-home, pay stub | Traditional vs Roth deposit |
| `/blog/nebraska-social-security-tax.html` | does nebraska tax social security benefits | fica, 1040n, brackets | Benefits, not the 6.2% wage tax |
| `/blog/nebraska-overtime-pay.html` | nebraska overtime pay | /hourly, min-wage, bonus, pay stub | Overtime premium withholding |
| `/blog/nebraska-1040n-vs-withholding.html` | nebraska 1040n vs paycheck withholding | /tax, circular en, w4n, brackets | Prepayment vs the return |
| `/blog/nebraska-circular-en.html` | nebraska circular en | /tax, w4n, 1040n, bonus | Withholding booklet, not the return |
| `/blog/nebraska-iowa-paycheck.html` | nebraska vs iowa paycheck (Omaha–Council Bluffs) | /, /hourly, omaha-lincoln, 1040n | Border commute, no Iowa calculator |
| `/blog/hsa-fsa-nebraska-paycheck.html` | hsa and health fsa on a nebraska paycheck | /, 401k, fica, take-home, pay stub, child care | Payroll HSA/FSA vs FICA, not the 401(k) guide |
| `/blog/nebraska-estimated-tax-payments.html` | nebraska estimated tax payments | /, 1040n, fica, w4n, standard deduction | 1040N-ES for income the W-2 never withholds |
| `/blog/nebraska-tipped-paycheck.html` | tip withholding on a nebraska paycheck | /, /hourly, min-wage, fica, pay stub | Reported-tip withholding, not the cash-wage floor |
| `/blog/nebraska-standard-deduction-paycheck.html` | nebraska standard deduction | /, 1040n, brackets, circular en | Return deduction, not brackets or the allowance form |
| `/blog/nebraska-child-care-tax-credit-paycheck.html` | nebraska child care tax credit | /, w4n, 1040n, hsa-fsa | Credits on the return, not a W-4N how-to |

Blog rules: pillar keeps "take-home pay / net pay calculator" (tool intent); the blog take-home post owns the explainer intent only. tax.html keeps W-4N *calculation*; the blog W-4N post owns the form how-to. Every page has exactly one self-referencing canonical. Footer of all pages links /blog/.

## Internal linking rule (audited 2026-11-05)
- Every page links to the homepage in the nav **and** in body text or the Related box (anchor: "Nebraska paycheck calculator" / "full take-home calculator").
- Every page gets at least 3 inbound body/Related links, not counting nav, header or footer links. There are no orphan pages. The hub links to every post, and each post gets links from at least 2 sibling or tool pages.

## Company & legal pages (added 2026-11-05) — trust/E-E-A-T, no target KW
| URL | Purpose | Canonical |
|---|---|---|
| `/about.html` | About Us — who we are, methodology (IRS Pub 15-T, NE Circular EN) | self |
| `/contact.html` | Contact — mailto contact@nebraskapaycheckcalculator.com | self |
| `/privacy.html` | Privacy Policy — inputs stay in browser | self |
| `/terms.html` | Terms of Use | self |
| `/disclaimer.html` | Tax estimate disclaimer | self |
| `/sitemap.html` | HTML sitemap of all 31 pages | self |

Rules: these pages never use "paycheck calculator"/"take-home pay" as H1/title keyword (brand name only), so they don't compete with tool or blog pages. Every page footer has 3 columns: Tools · Guides · Company & Legal (About, Contact, Privacy, Terms, Disclaimer, Sitemap). Add new posts to sitemap.html and sitemap.xml when published.

## New guides (2026-11-05) — distinct intents, no new primary on the pillar keywords
Owned elsewhere, so these pages only link there: "nebraska paycheck calculator" stays on `/`; filing brackets stay on the brackets guide; the state tax rate answer stays on the rate guide; W-4N how-to stays on the W-4N guide; minimum wage stays on the minimum-wage guide; gross-versus-net order stays on the take-home guide; FICA on wages stays on the FICA guide.

| From (body or Related) | New inbound targets |
|---|---|
| index FAQs | 401k, pay stub |
| hourly | overtime, pay stub |
| tax.html | bonus, 1040n, circular en, social security benefits |
| fica | pay stub, bonus, 401k, overtime, social security benefits |
| take-home | bonus, 401k |
| payroll | pay stub, 401k |
| minimum wage | overtime |
| brackets | social security benefits, circular en, 1040n |
| w4n | circular en |
| state tax rate | circular en, 1040n |
| omaha-lincoln | iowa |
| each new post | hub, `/` with the anchor "Nebraska paycheck calculator", and 3–4 sibling guides in the Related box |

Footer guide list is unchanged (take-home, brackets, minimum wage, W-4N, FICA). The hub and both sitemaps list all 21 posts.

## Five more guides (2026-11-05) — still no shared primary intent
Each row owns a keyword the earlier 16 posts do not. They link sideways and do not retitle a live page.

| URL | Primary intent | Nearest live sibling, and the line that keeps them apart |
|---|---|---|
| `/blog/hsa-fsa-nebraska-paycheck.html` | Payroll HSA and health FSA: taxable wages, FICA, and take-home | 401(k) guide owns the retirement deferral. This page only contrasts FICA. |
| `/blog/nebraska-estimated-tax-payments.html` | Form 1040N-ES for 1099 and side income | 1040N guide owns withholding versus the return. This page owns the $500 test and the voucher dates. |
| `/blog/nebraska-tipped-paycheck.html` | Tip withholding, FICA on tips, stub lines | Minimum-wage guide owns the $2.13 cash-wage floor. This page links there and does not restate it. |
| `/blog/nebraska-standard-deduction-paycheck.html` | Nebraska standard deduction on Form 1040N versus what withholding subtracts | Brackets guide owns the rates. Circular EN owns the allowance. This page owns the deduction amounts. |
| `/blog/nebraska-child-care-tax-credit-paycheck.html` | Nebraska child care credits, and the federal child tax credit, as return items | W-4N guide owns allowance counts. This page does not say how many to claim. |

| From (body) | New inbound targets |
|---|---|
| index deductions | hsa-fsa |
| 401k, fica, take-home | hsa-fsa |
| fica, 1040n, payroll | estimated tax |
| fica, minimum wage, hourly, pay stub | tipped paycheck |
| brackets, 1040n, state tax rate | standard deduction |
| 1040n, w4n, brackets | child care credit |

## SEO/AEO/GEO meta pass (Nov 5, 2026)
- Slugs kept (already keyword-rich; renaming would lose equity with no KW gain). No link/sitemap changes needed.
- Every page: unique title (45–60 chars), meta description (~150–160), H1 with primary KW, self-canonical, OG + Twitter summary card.
- JSON-LD @graph: Organization (all), WebSite (home), WebApplication (free, FinanceApplication) on /, /hourly.html, /tax.html, BlogPosting on posts, CollectionPage on /blog/, BreadcrumbList, WebPage+speakable, FAQPage built from on-page <details> FAQs. No ratings/reviews schema.
- Blog FICA post primary KW refined to "fica tax nebraska paycheck".
