const assert = require('assert');
const { calculate, money } = require('./paycheck.js');

function base(overrides) {
  return Object.assign({
    payType: 'salary',
    salary: 60000,
    periods: 26,
    payDate: '2026-06-15',
    fedStatus: 'single',
    neStatus: 'single',
    allowances: 1,
    hourly: 0,
    hours: 0,
    otHours: 0,
    otRate: 0,
    retirement: 0,
    benefits: 0,
    posttax: 0,
    credits: 0,
    otherIncome: 0,
    deductions: 0,
    extraFit: 0,
    extraNe: 0
  }, overrides);
}

const y2026 = calculate(base({}));
assert.strictEqual(money(y2026.gross), '$2,307.69');
assert.strictEqual(money(y2026.fit), '$193.08');
assert.strictEqual(money(y2026.ss), '$143.08');
assert.strictEqual(money(y2026.med), '$33.46');
assert.strictEqual(money(y2026.fica), '$176.54');
assert.strictEqual(money(y2026.state), '$81.70');
assert.strictEqual(money(y2026.net), '$1,856.37');
assert.ok(Math.abs(y2026.net - 1856.37) < 0.01, '2026 biweekly $60k net should stay about $1,856.37');

const y2027 = calculate(base({ payDate: '2027-01-15' }));
assert.strictEqual(y2027.year, 2027);
assert.strictEqual(money(y2027.state), '$73.80');
assert.strictEqual(money(y2027.net), '$1,864.28');
assert.strictEqual(money(y2027.fit), '$193.08');

const step2 = calculate(base({ step2: true }));
assert.ok(step2.fit > y2026.fit + 100, 'Step 2 checkbox should raise federal withholding');

const retirement = calculate(base({ retirement: 6000 }));
assert.ok(Math.abs(retirement.ss - y2026.ss) < 0.001, '401(k) should not reduce Social Security');
assert.ok(retirement.fit < y2026.fit, '401(k) should reduce federal tax');
assert.ok(retirement.state < y2026.state, '401(k) should reduce Nebraska tax');

const benefits = calculate(base({ benefits: 6000 }));
assert.ok(benefits.ss < y2026.ss, 'Section 125 benefits should reduce Social Security');

const exempt = calculate(base({ exemptFit: true, exemptSs: true, exemptMed: true, exemptNe: true }));
assert.strictEqual(exempt.fit, 0);
assert.strictEqual(exempt.fica, 0);
assert.strictEqual(exempt.state, 0);
assert.strictEqual(money(exempt.net), money(exempt.gross));

const addl = calculate(base({ salary: 250000 }));
assert.ok(addl.addlMed > 17 && addl.addlMed < 18, 'Additional Medicare on wages over $200,000');
assert.ok(addl.ss * 26 < 184500 * 0.062 + 0.02, 'Social Security stops at the wage base');

const high2027 = calculate(base({ salary: 250000, payDate: '2027-03-01' }));
assert.ok(high2027.ss * 26 > y2026.ss * 26, '2027 wage base is higher than 2026');

function row(salary) {
  const r = calculate(base({ salary: salary }));
  return [salary, money(r.gross), money(r.fit), money(r.fica), money(r.state), money(r.net)].join(' | ');
}
console.log('2026 salary biweekly single 1 allowance');
[30000, 50000, 60000, 75000, 100000].forEach(function (s) { console.log(row(s)); });

console.log('2026 hourly weekly 40h single 1 allowance');
[15, 18, 20, 25, 30].forEach(function (rate) {
  const r = calculate(base({ payType: 'hourly', hourly: rate, hours: 40, periods: 52, salary: 0 }));
  console.log([rate, money(r.annualGross), money(r.gross), money(r.fit), money(r.fica), money(r.state), money(r.net)].join(' | '));
});

console.log('2026 $60k biweekly allowances');
[0, 1, 2, 3].forEach(function (a) {
  const single = calculate(base({ allowances: a }));
  const married = calculate(base({ allowances: a, fedStatus: 'married', neStatus: 'married' }));
  console.log(a + ' single NE ' + money(single.state) + ' married NE ' + money(married.state));
});

console.log('default 2027 sample', money(y2027.net), 'annual', money(y2027.annualNet));
console.log('2026 sample', money(y2026.net), 'annual', money(y2026.annualNet));
console.log('ok');
