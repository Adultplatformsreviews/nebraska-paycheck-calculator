/* Nebraska paycheck estimate.
   Educational only. Not tax, legal, or payroll advice.
   Federal income tax: IRS Publication 15-T (2026) Worksheet 1A percentage method.
   Nebraska: Circular EN percentage-method tables for the pay date's year.
   2027 Publication 15-T was not available when this file was written, so 2027
   pay dates still use the 2026 federal income-tax schedules. Social Security
   wage base and Nebraska tables do switch on January 1, 2027. */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.NebraskaPaycheck = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var SS_RATE = 0.062;
  var MED_RATE = 0.0145;
  var ADDL_MED_RATE = 0.009;
  var ADDL_MED_THRESHOLD = 200000;

  /* Pub 15-T (2026) annual percentage method.
     Standard rows apply after the Worksheet 1A line 1g subtraction.
     Step 2 rows apply when that subtraction is zero. */
  var FED = {
    adjust: { single: 8600, married: 12900, hoh: 8600 },
    standard: {
      single: [
        { atLeast: 0, base: 0, rate: 0, over: 0 },
        { atLeast: 7500, base: 0, rate: 0.10, over: 7500 },
        { atLeast: 19900, base: 1240, rate: 0.12, over: 19900 },
        { atLeast: 57900, base: 5800, rate: 0.22, over: 57900 },
        { atLeast: 113200, base: 17966, rate: 0.24, over: 113200 },
        { atLeast: 209275, base: 41024, rate: 0.32, over: 209275 },
        { atLeast: 263725, base: 58448, rate: 0.35, over: 263725 },
        { atLeast: 648100, base: 192979.25, rate: 0.37, over: 648100 }
      ],
      married: [
        { atLeast: 0, base: 0, rate: 0, over: 0 },
        { atLeast: 19300, base: 0, rate: 0.10, over: 19300 },
        { atLeast: 44100, base: 2480, rate: 0.12, over: 44100 },
        { atLeast: 120100, base: 11600, rate: 0.22, over: 120100 },
        { atLeast: 230700, base: 35932, rate: 0.24, over: 230700 },
        { atLeast: 422850, base: 82048, rate: 0.32, over: 422850 },
        { atLeast: 531750, base: 116896, rate: 0.35, over: 531750 },
        { atLeast: 788000, base: 206583.50, rate: 0.37, over: 788000 }
      ],
      hoh: [
        { atLeast: 0, base: 0, rate: 0, over: 0 },
        { atLeast: 15550, base: 0, rate: 0.10, over: 15550 },
        { atLeast: 33250, base: 1770, rate: 0.12, over: 33250 },
        { atLeast: 83000, base: 7740, rate: 0.22, over: 83000 },
        { atLeast: 121250, base: 16155, rate: 0.24, over: 121250 },
        { atLeast: 217300, base: 39207, rate: 0.32, over: 217300 },
        { atLeast: 271750, base: 56631, rate: 0.35, over: 271750 },
        { atLeast: 656150, base: 191171, rate: 0.37, over: 656150 }
      ]
    },
    step2: {
      single: [
        { atLeast: 0, base: 0, rate: 0, over: 0 },
        { atLeast: 8050, base: 0, rate: 0.10, over: 8050 },
        { atLeast: 14250, base: 620, rate: 0.12, over: 14250 },
        { atLeast: 33250, base: 2900, rate: 0.22, over: 33250 },
        { atLeast: 60900, base: 8983, rate: 0.24, over: 60900 },
        { atLeast: 108938, base: 20512, rate: 0.32, over: 108938 },
        { atLeast: 136163, base: 29224, rate: 0.35, over: 136163 },
        { atLeast: 328350, base: 96489.63, rate: 0.37, over: 328350 }
      ],
      married: [
        { atLeast: 0, base: 0, rate: 0, over: 0 },
        { atLeast: 16100, base: 0, rate: 0.10, over: 16100 },
        { atLeast: 28500, base: 1240, rate: 0.12, over: 28500 },
        { atLeast: 66500, base: 5800, rate: 0.22, over: 66500 },
        { atLeast: 121800, base: 17966, rate: 0.24, over: 121800 },
        { atLeast: 217875, base: 41024, rate: 0.32, over: 217875 },
        { atLeast: 272325, base: 58448, rate: 0.35, over: 272325 },
        { atLeast: 400450, base: 103291.75, rate: 0.37, over: 400450 }
      ],
      hoh: [
        { atLeast: 0, base: 0, rate: 0, over: 0 },
        { atLeast: 12075, base: 0, rate: 0.10, over: 12075 },
        { atLeast: 20925, base: 885, rate: 0.12, over: 20925 },
        { atLeast: 45800, base: 3870, rate: 0.22, over: 45800 },
        { atLeast: 64925, base: 8077.5, rate: 0.24, over: 64925 },
        { atLeast: 112950, base: 19603.5, rate: 0.32, over: 112950 },
        { atLeast: 140175, base: 28315.5, rate: 0.35, over: 140175 },
        { atLeast: 332375, base: 95585.5, rate: 0.37, over: 332375 }
      ]
    }
  };

  function rows(list) {
    return list.map(function (r) {
      return { over: r[0], base: r[1], rate: r[2] };
    });
  }

  /* Circular EN percentage method. Each row is "over X: base + rate of excess over X".
     The first row is the zero bracket (not over the next threshold). */
  var NE_2026 = {
    ssBase: 184500,
    allowanceAnnual: 2440,
    allowance: { 52: 46.92, 26: 93.85, 24: 101.67, 12: 203.33, 1: 2440 },
    topRate: 0.046,
    tables: {
      52: {
        single: rows([[0, 0, 0], [66, 0, 0.0226], [129, 1.42, 0.0322], [419, 10.76, 0.0421], [608, 18.72, 0.0435], [772, 25.85, 0.0448], [1449, 56.18, 0.046]]),
        married: rows([[0, 0, 0], [158, 0, 0.0226], [250, 2.08, 0.0322], [623, 14.09, 0.0421], [969, 28.66, 0.0435], [1203, 38.84, 0.0448], [1595, 56.40, 0.046]])
      },
      26: {
        single: rows([[0, 0, 0], [132, 0, 0.0226], [258, 2.85, 0.0322], [839, 21.56, 0.0421], [1216, 37.43, 0.0435], [1543, 51.65, 0.0448], [2899, 112.40, 0.046]]),
        married: rows([[0, 0, 0], [315, 0, 0.0226], [500, 4.18, 0.0322], [1246, 28.20, 0.0421], [1938, 57.33, 0.0435], [2405, 77.64, 0.0448], [3189, 112.76, 0.046]])
      },
      24: {
        single: rows([[0, 0, 0], [143, 0, 0.0226], [280, 3.10, 0.0322], [909, 23.35, 0.0421], [1317, 40.53, 0.0435], [1672, 55.97, 0.0448], [3140, 121.74, 0.046]]),
        married: rows([[0, 0, 0], [341, 0, 0.0226], [542, 4.54, 0.0322], [1350, 30.56, 0.0421], [2100, 62.14, 0.0435], [2605, 84.11, 0.0448], [3455, 122.19, 0.046]])
      },
      12: {
        single: rows([[0, 0, 0], [286, 0, 0.0226], [559, 6.17, 0.0322], [1818, 46.71, 0.0421], [2634, 81.06, 0.0435], [3344, 111.95, 0.0448], [6281, 243.53, 0.046]]),
        married: rows([[0, 0, 0], [683, 0, 0.0226], [1084, 9.06, 0.0322], [2700, 61.10, 0.0421], [4200, 124.25, 0.0435], [5211, 168.23, 0.0448], [6910, 244.35, 0.046]])
      },
      1: {
        single: rows([[0, 0, 0], [3430, 0, 0.0226], [6710, 74.13, 0.0322], [21810, 560.35, 0.0421], [31610, 972.93, 0.0435], [40130, 1343.55, 0.0448], [75370, 2922.30, 0.046]]),
        married: rows([[0, 0, 0], [8190, 0, 0.0226], [13010, 108.93, 0.0322], [32400, 733.29, 0.0421], [50400, 1491.09, 0.0435], [62530, 2018.75, 0.0448], [82920, 2932.22, 0.046]])
      }
    }
  };

  var NE_2027 = {
    ssBase: 192300,
    allowanceAnnual: 2510,
    allowance: { 52: 48.27, 26: 96.54, 24: 104.58, 12: 209.17, 1: 2510 },
    topRate: 0.0403,
    tables: {
      52: {
        single: rows([[0, 0, 0], [68, 0, 0.0226], [133, 1.47, 0.0322], [432, 11.10, 0.0369], [626, 18.26, 0.0381], [794, 24.66, 0.0393], [1492, 52.09, 0.0403]]),
        married: rows([[0, 0, 0], [162, 0, 0.0226], [258, 2.17, 0.0322], [642, 14.53, 0.0369], [998, 27.67, 0.0381], [1238, 36.81, 0.0393], [1642, 52.69, 0.0403]])
      },
      26: {
        single: rows([[0, 0, 0], [136, 0, 0.0226], [266, 2.94, 0.0322], [863, 22.16, 0.0369], [1252, 36.51, 0.0381], [1589, 49.35, 0.0393], [2984, 104.17, 0.0403]]),
        married: rows([[0, 0, 0], [324, 0, 0.0226], [515, 4.32, 0.0322], [1283, 29.05, 0.0369], [1996, 55.36, 0.0381], [2476, 73.65, 0.0393], [3283, 105.37, 0.0403]])
      },
      24: {
        single: rows([[0, 0, 0], [147, 0, 0.0226], [288, 3.19, 0.0322], [935, 24.02, 0.0369], [1356, 39.55, 0.0381], [1721, 53.46, 0.0393], [3233, 112.88, 0.0403]]),
        married: rows([[0, 0, 0], [351, 0, 0.0226], [558, 4.68, 0.0322], [1390, 31.47, 0.0369], [2162, 59.96, 0.0381], [2682, 79.77, 0.0393], [3557, 114.16, 0.0403]])
      },
      12: {
        single: rows([[0, 0, 0], [294, 0, 0.0226], [576, 6.37, 0.0322], [1871, 48.07, 0.0369], [2712, 79.10, 0.0381], [3443, 106.95, 0.0393], [6466, 225.75, 0.0403]]),
        married: rows([[0, 0, 0], [703, 0, 0.0226], [1116, 9.33, 0.0322], [2780, 62.91, 0.0369], [4324, 119.88, 0.0381], [5364, 159.50, 0.0393], [7114, 228.28, 0.0403]])
      },
      1: {
        single: rows([[0, 0, 0], [3530, 0, 0.0226], [6910, 76.39, 0.0322], [22450, 576.78, 0.0369], [32540, 949.10, 0.0381], [41310, 1283.24, 0.0393], [77590, 2709.04, 0.0403]]),
        married: rows([[0, 0, 0], [8430, 0, 0.0226], [13390, 112.10, 0.0322], [33360, 755.13, 0.0369], [51890, 1438.89, 0.0381], [64370, 1914.38, 0.0393], [85370, 2739.68, 0.0403]])
      }
    }
  };

  var FREQ_LABEL = { 52: 'weekly', 26: 'biweekly', 24: 'semi-monthly', 12: 'monthly', 1: 'annual' };

  function num(v) {
    var n = typeof v === 'number' ? v : parseFloat(v);
    return isFinite(n) ? n : 0;
  }

  function nonneg(v) {
    return Math.max(0, num(v));
  }

  function taxYear(payDate) {
    var year = 2027;
    if (typeof payDate === 'string' && payDate.length >= 4) {
      var y = parseInt(payDate.slice(0, 4), 10);
      if (isFinite(y)) year = y;
    } else if (payDate instanceof Date && !isNaN(payDate.getTime())) {
      year = payDate.getFullYear();
    }
    return year >= 2027 ? 2027 : 2026;
  }

  function rulesFor(year) {
    return year >= 2027 ? NE_2027 : NE_2026;
  }

  function statusKey(status) {
    return status === 'married' || status === 'hoh' ? status : 'single';
  }

  function percentageMethod(amount, table) {
    var row = table[0];
    for (var i = 0; i < table.length; i++) {
      if (amount >= table[i].atLeast) row = table[i];
    }
    return row.base + row.rate * Math.max(0, amount - row.over);
  }

  function circularTax(wages, table) {
    var row = table[0];
    for (var i = 0; i < table.length; i++) {
      if (wages > table[i].over) row = table[i];
    }
    if (!row.rate) return 0;
    return Math.max(0, row.base + row.rate * (wages - row.over));
  }

  function periodKey(periods) {
    var p = Number(periods);
    if (NE_2026.tables[p]) return p;
    return 26;
  }

  function federalPeriod(opts) {
    var status = statusKey(opts.status);
    var step2 = !!opts.step2;
    var annual = nonneg(opts.annualWages) + nonneg(opts.otherIncome);
    var adjust = step2 ? 0 : FED.adjust[status];
    var adjusted = Math.max(0, annual - nonneg(opts.deductions) - adjust);
    var table = (step2 ? FED.step2 : FED.standard)[status];
    var annualTax = Math.max(0, percentageMethod(adjusted, table));
    var periods = opts.periods || 26;
    var per = annualTax / periods - nonneg(opts.credits) / periods;
    return Math.max(0, per) + nonneg(opts.extra);
  }

  function calculate(input) {
    input = input || {};
    var periods = periodKey(input.periods);
    var year = taxYear(input.payDate || '2027-01-15');
    var rules = rulesFor(year);
    var payType = input.payType === 'hourly' ? 'hourly' : 'salary';

    var regularAnnual = payType === 'hourly'
      ? nonneg(input.hourly) * nonneg(input.hours) * 52
      : nonneg(input.salary);
    var otAnnual = nonneg(input.otHours) * nonneg(input.otRate) * 52;
    var annualGross = regularAnnual + otAnnual;

    var retirement = Math.min(annualGross, nonneg(input.retirement));
    var benefits = Math.min(Math.max(0, annualGross - retirement), nonneg(input.benefits));
    var incomeWages = Math.max(0, annualGross - retirement - benefits);
    var ficaWages = Math.max(0, annualGross - benefits);

    var gross = annualGross / periods;
    var pretax = (retirement + benefits) / periods;
    var posttax = nonneg(input.posttax);

    var fit = input.exemptFit ? 0 : federalPeriod({
      annualWages: incomeWages,
      periods: periods,
      status: input.fedStatus,
      step2: input.step2,
      otherIncome: input.otherIncome,
      deductions: input.deductions,
      credits: input.credits,
      extra: input.extraFit
    });

    var ss = 0;
    var med = 0;
    var addlMed = 0;
    if (!input.exemptSs) {
      ss = Math.min(ficaWages, rules.ssBase) / periods * SS_RATE;
    }
    if (!input.exemptMed) {
      med = ficaWages / periods * MED_RATE;
      addlMed = Math.max(0, ficaWages - ADDL_MED_THRESHOLD) / periods * ADDL_MED_RATE;
    }

    var neStatus = statusKey(input.neStatus) === 'married' ? 'married' : 'single';
    var allowanceEach = rules.allowance[periods];
    var allowances = Math.max(0, Math.floor(num(input.allowances)));
    var neWage = incomeWages / periods;
    var neTaxable = Math.max(0, neWage - allowanceEach * allowances);
    var state = input.exemptNe ? 0 : circularTax(neTaxable, rules.tables[periods][neStatus]) + nonneg(input.extraNe);

    var fica = ss + med + addlMed;
    var taxes = fit + fica + state;
    var net = Math.max(0, gross - pretax - taxes - posttax);
    var withheld = pretax + fit + fica + state + posttax;

    return {
      year: year,
      periods: periods,
      frequency: FREQ_LABEL[periods] || 'biweekly',
      payType: payType,
      annualGross: annualGross,
      regularAnnual: regularAnnual,
      otAnnual: otAnnual,
      gross: gross,
      pretax: pretax,
      retirement: retirement / periods,
      benefits: benefits / periods,
      fit: fit,
      ss: ss,
      med: med,
      addlMed: addlMed,
      fica: fica,
      state: state,
      posttax: posttax,
      net: net,
      taxes: taxes,
      annualNet: net * periods,
      allowanceEach: allowanceEach,
      allowanceAnnual: rules.allowanceAnnual,
      ssBase: rules.ssBase,
      neTop: rules.topRate,
      neTaxable: neTaxable,
      incomeWages: incomeWages,
      ficaWages: ficaWages,
      pct: {
        net: gross ? net / gross : 0,
        pretax: gross ? pretax / gross : 0,
        fit: gross ? fit / gross : 0,
        ss: gross ? ss / gross : 0,
        med: gross ? (med + addlMed) / gross : 0,
        fica: gross ? fica / gross : 0,
        state: gross ? state / gross : 0,
        posttax: gross ? posttax / gross : 0,
        taxes: gross ? taxes / gross : 0
      },
      sumsToGross: Math.abs((net + Math.min(withheld, gross)) - gross) < 0.02 || gross === 0
    };
  }

  function money(n) {
    var v = Math.max(0, num(n));
    return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function pct(n) {
    return (num(n) * 100).toFixed(1) + '%';
  }

  var COLORS = {
    net: '#1a5fb4',
    fit: '#b42318',
    fica: '#b86e00',
    state: '#0f6b4c',
    pretax: '#5b6b7c',
    posttax: '#6b4c9a'
  };

  function donutSvg(parts) {
    var r = 42;
    var c = 2 * Math.PI * r;
    var total = 0;
    parts.forEach(function (p) { total += p.value; });
    if (total <= 0) {
      return '<svg viewBox="0 0 120 120" class="pc-donut" role="img" aria-label="No paycheck to chart"><circle cx="60" cy="60" r="42" fill="none" stroke="#d5deea" stroke-width="14"/></svg>';
    }
    var offset = 0;
    var circles = parts.filter(function (p) { return p.value > 0.004; }).map(function (p) {
      var len = (p.value / total) * c;
      var gap = Math.min(1.2, len * 0.04);
      var draw = Math.max(0, len - gap);
      var circle = '<circle cx="60" cy="60" r="42" fill="none" stroke="' + p.color + '" stroke-width="14" stroke-linecap="butt" stroke-dasharray="' + draw.toFixed(3) + ' ' + (c - draw).toFixed(3) + '" stroke-dashoffset="' + (-offset).toFixed(3) + '"/>';
      offset += len;
      return circle;
    }).join('');
    return '<svg viewBox="0 0 120 120" class="pc-donut" role="img" aria-hidden="true">' + circles + '</svg>';
  }

  function readForm(root) {
    function val(name) {
      var el = root.querySelector('[name="' + name + '"]');
      return el ? el.value : '';
    }
    function on(name) {
      var el = root.querySelector('[name="' + name + '"]');
      return !!(el && el.checked);
    }
    var payBtn = root.querySelector('.pc-seg button.active');
    return {
      payType: payBtn ? payBtn.getAttribute('data-pay') : 'salary',
      salary: val('salary'),
      hourly: val('hourly'),
      hours: val('hours'),
      otHours: val('otHours'),
      otRate: val('otRate'),
      periods: val('frequency'),
      payDate: val('payDate'),
      fedStatus: val('fedStatus'),
      step2: on('step2'),
      credits: val('credits'),
      otherIncome: val('otherIncome'),
      deductions: val('deductions'),
      extraFit: val('extraFit'),
      exemptFit: on('exemptFit'),
      exemptSs: on('exemptSs'),
      exemptMed: on('exemptMed'),
      neStatus: val('neStatus'),
      allowances: val('allowances'),
      extraNe: val('extraNe'),
      exemptNe: on('exemptNe'),
      retirement: val('retirement'),
      benefits: val('benefits'),
      posttax: val('posttax')
    };
  }

  function line(label, amount, share, opts) {
    opts = opts || {};
    var cls = opts.strong ? ' pc-line-strong' : '';
    var amtCls = opts.neg ? 'neg' : (opts.zero ? 'zero' : '');
    var text = opts.neg ? '− ' + money(amount) : money(amount);
    return '<div class="line' + cls + '"><span>' + label + '</span><span class="pc-amt"><span class="' + amtCls + '">' + text + '</span><span class="pc-pct">' + pct(share) + '</span></span></div>';
  }

  function renderResults(root, r) {
    var box = root.querySelector('[data-results]');
    if (!box) return;
    var live = root.querySelector('[data-live]');
    if (live) live.textContent = 'Take-home ' + money(r.net) + ' per ' + r.frequency + ' paycheck.';
    var parts = [
      { key: 'net', value: r.net, color: COLORS.net, label: 'Take-home' },
      { key: 'fit', value: r.fit, color: COLORS.fit, label: 'Federal' },
      { key: 'fica', value: r.fica, color: COLORS.fica, label: 'FICA' },
      { key: 'state', value: r.state, color: COLORS.state, label: 'Nebraska' },
      { key: 'pretax', value: r.pretax, color: COLORS.pretax, label: 'Pre-tax' },
      { key: 'posttax', value: r.posttax, color: COLORS.posttax, label: 'Post-tax' }
    ];
    var medLabel = r.addlMed > 0 ? 'Medicare + extra 0.9%' : 'Medicare (1.45%)';
    var otNote = r.otAnnual > 0 ? ' Includes ' + money(r.otAnnual / r.periods) + ' overtime.' : '';
    var legend = parts.filter(function (p) { return p.value > 0.004; }).map(function (p) {
      return '<span class="pc-key"><i style="background:' + p.color + '"></i>' + p.label + '</span>';
    }).join('');

    box.innerHTML =
      '<h2>Take-home estimate</h2>' +
      '<div class="pc-result-top">' +
        '<div class="pc-donut-wrap">' +
          donutSvg(parts) +
          '<div class="pc-donut-label"><b>' + pct(r.pct.net) + '</b><span>take-home</span></div>' +
        '</div>' +
        '<div class="net">' +
          '<div class="k">Net take-home · ' + r.year + '</div>' +
          '<div class="v" id="netPay" tabindex="-1">' + money(r.net) + '</div>' +
          '<div class="s" id="netMeta">per ' + r.frequency + ' paycheck · ' + money(r.annualNet) + ' / year</div>' +
        '</div>' +
      '</div>' +
      '<div class="pc-legend">' + legend + '</div>' +
      line('Gross pay', r.gross, r.gross ? 1 : 0) +
      line('Pre-tax deductions', r.pretax, r.pct.pretax, { neg: true }) +
      line('Federal income tax', r.fit, r.pct.fit, { neg: true }) +
      line('Social Security (6.2%)', r.ss, r.pct.ss, { neg: true }) +
      line(medLabel, r.med + r.addlMed, r.pct.med, { neg: true }) +
      line('Nebraska state income tax', r.state, r.pct.state, { neg: true }) +
      line('Nebraska local income tax', 0, 0, { zero: true }) +
      line('Post-tax deductions', r.posttax, r.pct.posttax, { neg: true }) +
      line('Net take-home', r.net, r.pct.net, { strong: true }) +
      '<p class="tiny" id="effRate">Taxes are ' + pct(r.pct.taxes) + ' of gross. Annual gross ' + money(r.annualGross) + '.' + otNote + ' Withholding year ' + r.year + '.</p>';
  }

  function syncAllowanceHint(root, r) {
    var hint = root.querySelector('[data-allow-hint]');
    if (!hint || !r) return;
    hint.textContent = 'each removes ' + money(r.allowanceEach) + ' from this check (' + money(r.allowanceAnnual) + ' / year)';
  }

  function mount(container, options) {
    if (!container) return;
    options = options || {};
    var initialPay = options.payType === 'hourly' ? 'hourly' : 'salary';
    var initialTab = options.initialTab || 'earnings';
    container.innerHTML =
      '<div class="calc">' +
        '<section class="card pc-form">' +
          '<h2>' + (options.heading || 'Build your paycheck') + '</h2>' +
          '<div class="pc-tabs" role="tablist" aria-label="Paycheck inputs">' +
            '<button type="button" role="tab" id="tab-earnings" aria-controls="panel-earnings" data-tab="earnings">Earnings</button>' +
            '<button type="button" role="tab" id="tab-federal" aria-controls="panel-federal" data-tab="federal">Federal</button>' +
            '<button type="button" role="tab" id="tab-state" aria-controls="panel-state" data-tab="state">State</button>' +
            '<button type="button" role="tab" id="tab-benefits" aria-controls="panel-benefits" data-tab="benefits">Benefits</button>' +
          '</div>' +
          '<div role="tabpanel" id="panel-earnings" aria-labelledby="tab-earnings" data-panel="earnings">' +
            '<label>Pay type</label>' +
            '<div class="seg pc-seg" id="paySeg">' +
              '<button type="button" data-pay="salary">Salary</button>' +
              '<button type="button" data-pay="hourly">Hourly</button>' +
            '</div>' +
            '<div data-salary-box>' +
              '<label for="salary">Annual salary (USD)</label>' +
              '<input class="field" id="salary" name="salary" type="number" min="0" step="100" value="60000" inputmode="decimal" />' +
            '</div>' +
            '<div data-hourly-box>' +
              '<div class="row2">' +
                '<div><label for="hourly">Hourly wage (USD)</label><input class="field" id="hourly" name="hourly" type="number" min="0" step="0.01" value="28" inputmode="decimal" /></div>' +
                '<div><label for="hours">Regular hours / week</label><input class="field" id="hours" name="hours" type="number" min="0" step="0.5" value="40" inputmode="decimal" /></div>' +
              '</div>' +
            '</div>' +
            '<div class="row2">' +
              '<div><label for="otHours">Overtime hours / week <span class="hint">added on top of regular pay</span></label><input class="field" id="otHours" name="otHours" type="number" min="0" step="0.5" value="0" inputmode="decimal" /></div>' +
              '<div><label for="otRate">Overtime rate ($/hour)</label><input class="field" id="otRate" name="otRate" type="number" min="0" step="0.01" value="0" inputmode="decimal" /></div>' +
            '</div>' +
            '<p class="tiny pc-ot-hint" data-ot-hint>Hourly overtime rate starts at 1.5× the wage until you edit it. Salary overtime is an extra hourly amount added to the annual salary.</p>' +
            '<div class="row2">' +
              '<div><label for="frequency">Pay frequency</label><select id="frequency" name="frequency"><option value="52">Weekly</option><option value="26" selected>Biweekly</option><option value="24">Semi-monthly</option><option value="12">Monthly</option><option value="1">Annual</option></select></div>' +
              '<div><label for="payDate">Pay date <span class="hint">chooses 2026 or 2027 tables</span></label><input class="field" id="payDate" name="payDate" type="date" value="2027-01-15" /></div>' +
            '</div>' +
          '</div>' +
          '<div role="tabpanel" id="panel-federal" aria-labelledby="tab-federal" data-panel="federal" hidden>' +
            '<label for="fedStatus">Federal filing status <span class="hint">W-4 Step 1</span></label>' +
            '<select id="fedStatus" name="fedStatus"><option value="single">Single or married filing separately</option><option value="married">Married filing jointly</option><option value="hoh">Head of household</option></select>' +
            '<label class="pc-check"><input type="checkbox" name="step2" /> Withhold using the two-jobs rate (W-4 Step 2)</label>' +
            '<label for="credits">Dependent tax credits / year <span class="hint">W-4 Step 3</span></label>' +
            '<input class="field" id="credits" name="credits" type="number" min="0" step="100" value="0" inputmode="decimal" />' +
            '<div class="row2">' +
              '<div><label for="otherIncome">Other income / year <span class="hint">W-4 Step 4(a)</span></label><input class="field" id="otherIncome" name="otherIncome" type="number" min="0" step="100" value="0" inputmode="decimal" /></div>' +
              '<div><label for="deductions">Deductions / year <span class="hint">W-4 Step 4(b)</span></label><input class="field" id="deductions" name="deductions" type="number" min="0" step="100" value="0" inputmode="decimal" /></div>' +
            '</div>' +
            '<label for="extraFit">Extra federal withholding / paycheck <span class="hint">W-4 Step 4(c)</span></label>' +
            '<input class="field" id="extraFit" name="extraFit" type="number" min="0" step="1" value="0" inputmode="decimal" />' +
            '<label class="pc-check"><input type="checkbox" name="exemptFit" /> Exempt from federal income tax withholding</label>' +
            '<label class="pc-check"><input type="checkbox" name="exemptSs" /> Exempt from Social Security</label>' +
            '<label class="pc-check"><input type="checkbox" name="exemptMed" /> Exempt from Medicare</label>' +
          '</div>' +
          '<div role="tabpanel" id="panel-state" aria-labelledby="tab-state" data-panel="state" hidden>' +
            '<label for="neStatus">Nebraska filing status <span class="hint">W-4N</span></label>' +
            '<select id="neStatus" name="neStatus"><option value="single">Single or married filing separately</option><option value="married">Married filing jointly</option><option value="hoh">Head of household (single table)</option></select>' +
            '<label for="allowances">Nebraska W-4N allowances <span class="hint" data-allow-hint>each removes a fixed amount from this check</span></label>' +
            '<input class="field" id="allowances" name="allowances" type="number" min="0" step="1" value="1" inputmode="numeric" />' +
            '<label for="extraNe">Extra Nebraska withholding / paycheck</label>' +
            '<input class="field" id="extraNe" name="extraNe" type="number" min="0" step="1" value="0" inputmode="decimal" />' +
            '<label class="pc-check"><input type="checkbox" name="exemptNe" /> Exempt from Nebraska income tax withholding</label>' +
            '<p class="tiny">Head of household uses the single Circular EN table, the same way the published percentage-method tables group that status. Nebraska has no city wage tax.</p>' +
          '</div>' +
          '<div role="tabpanel" id="panel-benefits" aria-labelledby="tab-benefits" data-panel="benefits" hidden>' +
            '<label for="retirement">Pre-tax retirement / year <span class="hint">401(k), 403(b) — lowers income tax, not FICA</span></label>' +
            '<input class="field" id="retirement" name="retirement" type="number" min="0" step="100" value="0" inputmode="decimal" />' +
            '<label for="benefits">Pre-tax benefits / year <span class="hint">medical, FSA, HSA — lowers income tax and FICA</span></label>' +
            '<input class="field" id="benefits" name="benefits" type="number" min="0" step="100" value="0" inputmode="decimal" />' +
            '<label for="posttax">Post-tax deductions / paycheck <span class="hint">Roth 401(k), dues, garnishments</span></label>' +
            '<input class="field" id="posttax" name="posttax" type="number" min="0" step="1" value="0" inputmode="decimal" />' +
          '</div>' +
          '<button class="btn" type="button" data-calc>Calculate take-home</button>' +
          '<details class="pc-assumptions"><summary>Assumptions behind this estimate</summary>' +
            '<ul>' +
              '<li>Federal income tax follows IRS Publication 15-T (2026) Worksheet 1A for a 2020 or later W-4. Pay dates in 2027 still use those federal schedules because the 2027 edition was not published yet. Withholding is kept in cents.</li>' +
              '<li>Social Security is 6.2% up to $184,500 of 2026 wages or $192,300 of 2027 wages. Medicare is 1.45% on all wages, plus 0.9% Additional Medicare Tax above $200,000. The estimate treats this job as the only job and this pay as the rate for the full year.</li>' +
              '<li>Nebraska tax uses the Circular EN percentage-method table for the paycheck frequency. A 2026 pay date uses the 2026 tables (about 2.26%–4.60%). A 2027 pay date uses the 2027 tables (about 2.26%–4.03%). One allowance is $2,440 in 2026 and $2,510 in 2027.</li>' +
              '<li>Hourly and overtime pay are annualized as weekly amounts × 52, then divided by the number of paychecks. That matches a steady schedule, not a single unusual week on a semi-monthly calendar.</li>' +
            '</ul>' +
          '</details>' +
        '</section>' +
        '<section class="card"><div data-results></div><p class="pc-sr" data-live aria-live="polite"></p></section>' +
      '</div>';

    var salaryBtn = container.querySelector('[data-pay="salary"]');
    var hourlyBtn = container.querySelector('[data-pay="hourly"]');
    var otDirty = false;
    var neDirty = false;

    function setPay(type) {
      salaryBtn.classList.toggle('active', type === 'salary');
      hourlyBtn.classList.toggle('active', type === 'hourly');
      salaryBtn.setAttribute('aria-pressed', type === 'salary' ? 'true' : 'false');
      hourlyBtn.setAttribute('aria-pressed', type === 'hourly' ? 'true' : 'false');
      container.querySelector('[data-salary-box]').hidden = type !== 'salary';
      container.querySelector('[data-hourly-box]').hidden = type !== 'hourly';
      if (type === 'hourly' && !otDirty) fillOtDefault();
    }

    function fillOtDefault() {
      var wage = nonneg(container.querySelector('[name="hourly"]').value);
      container.querySelector('[name="otRate"]').value = wage ? (Math.round(wage * 1.5 * 100) / 100).toString() : '0';
    }

    function setTab(name) {
      container.querySelectorAll('[role="tab"]').forEach(function (tab) {
        var on = tab.getAttribute('data-tab') === name;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
      });
      container.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-panel') !== name;
      });
    }

    function recalc() {
      var data = readForm(container);
      var result = calculate(data);
      renderResults(container, result);
      syncAllowanceHint(container, result);
      return result;
    }

    container.querySelectorAll('.pc-seg button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setPay(btn.getAttribute('data-pay'));
        recalc();
      });
    });

    container.querySelectorAll('[role="tab"]').forEach(function (tab) {
      tab.addEventListener('click', function () { setTab(tab.getAttribute('data-tab')); });
    });

    container.querySelector('[name="hourly"]').addEventListener('input', function () {
      if (!otDirty) fillOtDefault();
    });
    container.querySelector('[name="otRate"]').addEventListener('input', function () {
      otDirty = true;
    });
    container.querySelector('[name="fedStatus"]').addEventListener('change', function (e) {
      if (!neDirty) container.querySelector('[name="neStatus"]').value = e.target.value;
    });
    container.querySelector('[name="neStatus"]').addEventListener('change', function () {
      neDirty = true;
    });

    container.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('input', recalc);
      el.addEventListener('change', recalc);
    });

    container.querySelector('[data-calc]').addEventListener('click', function () {
      recalc();
      var net = container.querySelector('#netPay');
      if (net && net.scrollIntoView) net.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    setPay(initialPay);
    if (initialPay === 'hourly') fillOtDefault();
    setTab(initialTab);
    recalc();
  }

  return {
    calculate: calculate,
    mount: mount,
    taxYear: taxYear,
    money: money
  };
});
