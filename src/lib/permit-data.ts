

interface PermitData {
  permitCostLow: number;
  permitCostHigh: number;
  backyardHeight: number;
  frontyardHeight: number;
  setbackInches: number;
  permitRequiredHeight: number;
  fineLow: number;
  fineHigh: number;
  processingDays: string;
}

const STATE_PERMIT_DATA: Record<string, Partial<PermitData>> = {

  CA: { permitCostLow: 50, permitCostHigh: 300, fineLow: 250, fineHigh: 2500 },
  NY: { permitCostLow: 50, permitCostHigh: 250, fineLow: 250, fineHigh: 2000 },
  NJ: { permitCostLow: 40, permitCostHigh: 200, fineLow: 200, fineHigh: 2000 },
  MA: { permitCostLow: 40, permitCostHigh: 200, fineLow: 200, fineHigh: 1500 },
  CT: { permitCostLow: 35, permitCostHigh: 175, fineLow: 200, fineHigh: 1500 },
  WA: { permitCostLow: 35, permitCostHigh: 200, fineLow: 200, fineHigh: 2000 },
  CO: { permitCostLow: 30, permitCostHigh: 150, fineLow: 150, fineHigh: 1000 },
  IL: { permitCostLow: 30, permitCostHigh: 175, fineLow: 200, fineHigh: 1500 },

  FL: { permitCostLow: 25, permitCostHigh: 150, fineLow: 150, fineHigh: 1000, processingDays: '3–10 business days' },
  TX: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 1000, frontyardHeight: 4 },
  AZ: { permitCostLow: 25, permitCostHigh: 125, fineLow: 100, fineHigh: 1000 },
  GA: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 800 },
  NC: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 1000 },
  VA: { permitCostLow: 25, permitCostHigh: 125, fineLow: 150, fineHigh: 1000 },
  OH: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 800 },
  PA: { permitCostLow: 25, permitCostHigh: 150, fineLow: 150, fineHigh: 1000 },
  MI: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 800 },

  AL: { permitCostLow: 15, permitCostHigh: 75, fineLow: 50, fineHigh: 500 },
  MS: { permitCostLow: 15, permitCostHigh: 75, fineLow: 50, fineHigh: 500 },
  AR: { permitCostLow: 15, permitCostHigh: 75, fineLow: 50, fineHigh: 500 },
  TN: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 750 },
  MO: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 750 },
  IN: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 750 },
  KY: { permitCostLow: 15, permitCostHigh: 75, fineLow: 50, fineHigh: 500 },
  SC: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 750 },
  OK: { permitCostLow: 15, permitCostHigh: 75, fineLow: 50, fineHigh: 500 },
  OR: { permitCostLow: 30, permitCostHigh: 175, fineLow: 150, fineHigh: 1000 },
  MN: { permitCostLow: 25, permitCostHigh: 125, fineLow: 100, fineHigh: 1000 },
  WI: { permitCostLow: 20, permitCostHigh: 100, fineLow: 100, fineHigh: 750 },
  NV: { permitCostLow: 25, permitCostHigh: 150, fineLow: 150, fineHigh: 1000 },
  UT: { permitCostLow: 25, permitCostHigh: 125, fineLow: 100, fineHigh: 1000 },
};

const DEFAULTS: PermitData = {
  permitCostLow: 20,
  permitCostHigh: 125,
  backyardHeight: 6,
  frontyardHeight: 4,
  setbackInches: 6,
  permitRequiredHeight: 4,
  fineLow: 100,
  fineHigh: 1000,
  processingDays: '5–15 business days',
};

export function getPermitData(stateCode: string): PermitData {
  const stateOverrides = STATE_PERMIT_DATA[stateCode] || {};
  return { ...DEFAULTS, ...stateOverrides };
}
