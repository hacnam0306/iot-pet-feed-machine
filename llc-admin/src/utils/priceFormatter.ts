import currencyFormatter from 'currency-formatter'

export const formatCurrencyInput = (price: string) => {
  const priceArr = price.split('.')
  priceArr[0] = Number.isNaN(+priceArr[0])
    ? priceArr[0]
    : new Intl.NumberFormat().format(+priceArr[0])
  return price.includes('.') ? priceArr.join('.') : priceArr[0]
}

export const unformatCurrencyInput = (
  formattedPrice: string,
  currency = 'USD'
) => {
  return currencyFormatter.unformat(formattedPrice, { code: currency })
}
