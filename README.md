# Nebraska Paycheck Calculator

Static site for [nebraskapaycheckcalculator.com](https://nebraskapaycheckcalculator.com/). It estimates Nebraska take-home pay after federal income tax, FICA, and Nebraska state withholding. Pages are static HTML. Shared calculator logic lives in `paycheck.js`, and numbers stay in the browser.

`node paycheck.test.js` checks the published sample: $60,000, single, biweekly, one W-4N allowance is about $1,856.37 net on a 2026 pay date and about $1,864.28 on a 2027 pay date.
## Pages

- `index.html` — salary paycheck calculator (weekly, biweekly, semi-monthly, monthly)
- `hourly.html` — hourly wage calculator, including overtime
- `tax.html` — Nebraska income tax withholding guide
- `blog/` — guides on take-home pay, brackets, minimum wage, W-4N, FICA, payroll taxes, pay stubs, bonuses, 401(k), Social Security benefits, overtime, Form 1040N, Circular EN, Nebraska vs Iowa, HSA and health FSA, estimated tax, tipped paychecks, the standard deduction, and child care credits
- `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`, `sitemap.html`

`topical-map.md` records which keyword and intent each URL owns so new pages do not compete with the calculator.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Estimates follow IRS Publication 15-T (2026) percentage-method withholding and Nebraska Department of Revenue Circular EN for the pay date's year (2026 or 2027). Federal income-tax schedules stay on the 2026 Publication 15-T tables until the IRS publishes the 2027 edition. Social Security wage base is $184,500 in 2026 and $192,300 in 2027. They are educational only and are not tax, legal, or payroll advice.
