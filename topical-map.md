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
- Future additions are allowed only for a distinct intent, such as a "Nebraska vs Iowa paycheck" comparison or a bonus/supplemental-wage page. Add the row here first.

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
| min-wage | hourly ("calculate take-home at $15 an hour"), take-home, omaha-lincoln, hub |
| take-home | index ("Nebraska take-home pay calculator"), fica, min-wage, hub |
| payroll | index, fica, w4n, hub |
| fica | index, payroll, take-home, hub |
| omaha-lincoln | index, hourly, min-wage, hub |
| blog hub | lists all 8 posts + index, hourly, tax |

**Clusters:**
- Tax: brackets ⇄ state-tax-rate ⇄ w4n ⇄ tax.html, a full triangle with tax.html at the centre
- Wage: min-wage ⇄ hourly
- Net pay: take-home ⇄ index · payroll ⇄ fica ⇄ index · omaha-lincoln → index (index links back to omaha-lincoln)

**Guardrails:** Only the pillar receives the exact anchor "Nebraska paycheck calculator" (it appears in the hub box and the existing body links). Each page has at most about 5 related links plus the global nav/footer. No page links to every post except the hub.

Note: the canonical URLs use the placeholder https://nebraskapaycheckcalculator.com/. Replace it with the live domain.

## Blog (/blog/) — informational intent only; never "calculator" in H1/title
| URL | Primary KW (owned) | Links to | Intent |
|---|---|---|---|
| `/blog/` blog/index.html | nebraska pay & tax guides (hub) | all posts, /, /hourly, /tax | Hub |
| `/blog/nebraska-income-tax-brackets.html` | nebraska income tax brackets | /tax.html, / | Rates by bracket |
| `/blog/nebraska-state-tax-rate.html` | nebraska state tax rate | /tax.html, / | Quick rate answer |
| `/blog/nebraska-minimum-wage.html` | nebraska minimum wage 2026 | /hourly.html, / | $15 wage facts |
| `/blog/nebraska-take-home-pay.html` | nebraska take home pay (explainer) | /, /hourly.html | Gross vs net concepts |
| `/blog/omaha-lincoln-paycheck.html` | omaha paycheck (city cost context), lincoln | /, /hourly, /tax | City guide, not a calculator |
| `/blog/nebraska-payroll-taxes.html` | nebraska payroll taxes | /, /tax.html | Employer vs employee |
| `/blog/nebraska-w4n-allowances.html` | nebraska w-4n allowances | /tax.html, / | Form how-to |
| `/blog/fica-social-security-medicare-paycheck.html` | fica on nebraska paycheck | / | SS/Medicare explainer |

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
| `/sitemap.html` | HTML sitemap of all 18 pages | self |

Rules: these pages never use "paycheck calculator"/"take-home pay" as H1/title keyword (brand name only), so they don't compete with tool or blog pages. Every page footer has 3 columns: Tools · Guides · Company & Legal (About, Contact, Privacy, Terms, Disclaimer, Sitemap). Add new posts to sitemap.html when published.

## SEO/AEO/GEO meta pass (Nov 5, 2026)
- Slugs kept (already keyword-rich; renaming would lose equity with no KW gain). No link/sitemap changes needed.
- Every page: unique title (45–60 chars), meta description (~150–160), H1 with primary KW, self-canonical, OG + Twitter summary card.
- JSON-LD @graph: Organization (all), WebSite (home), WebApplication (free, FinanceApplication) on /, /hourly.html, /tax.html, BlogPosting on posts, CollectionPage on /blog/, BreadcrumbList, WebPage+speakable, FAQPage built from on-page <details> FAQs. No ratings/reviews schema.
- Blog FICA post primary KW refined to "fica tax nebraska paycheck".
