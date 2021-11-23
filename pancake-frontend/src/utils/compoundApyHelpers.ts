export const tokenEarnedPerThousandDollarsCompounding = ({
  numberOfDays,
  farmApr,
  tokenPrice,
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  // Everything here is worked out relative to a year, with the asset compounding at the compoundFrequency rate. 1 = once per day
  const timesCompounded = 365 * compoundFrequency
  // We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
  let aprAsDecimal = farmApr / 100

  if (performanceFee) {
    // Reduce the APR by the % performance fee
    const feeRelativeToApr = (farmApr / 100) * performanceFee
    const aprAfterFee = farmApr - feeRelativeToApr
    aprAsDecimal = aprAfterFee / 100
  }

  const daysAsDecimalOfYear = numberOfDays / 365
  // Calculate the starting TOKEN balance with a dollar balance of $1000.
  const principal = 1000 / tokenPrice
  // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
  const finalAmount = principal * (1 + aprAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)
  // To get the TOKEN amount earned, deduct the amount after compounding (finalAmount) from the starting TOKEN balance (principal)
  const interestEarned = finalAmount - principal

  return parseFloat(interestEarned.toFixed(roundingDecimals))
}

/**
 * Given APR returns APY
 * @param apr APR as percentage
 * @param compoundFrequency how many compounds per day
 * @param days if other than 365 adjusts (A)PY for period less than a year
 * @param performanceFee performance fee as percentage
 * @returns APY as decimal
 */
export const getApy = (apr: number, compoundFrequency = 1, days = 365, performanceFee = 0) => {
  const daysAsDecimalOfYear = days / 365
  const aprAsDecimal = apr / 100
  const timesCompounded = 365 * compoundFrequency
  let apyAsDecimal = (apr / 100) * daysAsDecimalOfYear
  if (timesCompounded > 0) {
    apyAsDecimal = (1 + aprAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear) - 1
  }
  if (performanceFee) {
    const performanceFeeAsDecimal = performanceFee / 100
    const takenAsPerformanceFee = apyAsDecimal * performanceFeeAsDecimal
    apyAsDecimal -= takenAsPerformanceFee
  }
  return apyAsDecimal
}

export const getRoi = ({ amountEarned, amountInvested }: { amountEarned: number; amountInvested: number }) => {
  if (amountInvested === 0) {
    return 0
  }
  const percentage = (amountEarned / amountInvested) * 100
  return percentage
}
