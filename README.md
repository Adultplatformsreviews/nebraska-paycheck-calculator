# Nebraska Paycheck Calculator

Static site for [nebraskapaycheckcalculator.com](https://nebraskapaycheckcalculator.com/). It estimates 2026 Nebraska take-home pay after federal income tax, FICA, and Nebraska state withholding. All pages are self-contained HTML: styles and calculator logic live in each file, and numbers stay in the browser.

## Pages

- `index.html` — salary paycheck calculator (weekly, biweekly, semi-monthly, monthly)
- `hourly.html` — hourly wage calculator, including overtime
- `tax.html` — Nebraska income tax withholding guide
- `blog/` — guides on take-home pay, brackets, minimum wage, W-4N, FICA, and payroll taxes
- `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`, `sitemap.html`

`topical-map.md` records which keyword and intent each URL owns so new pages do not compete with the calculator.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Estimates follow published IRS Publication 15-T percentage-method tables and Nebraska Department of Revenue Circular EN. They are educational only and are not tax, legal, or payroll advice.
