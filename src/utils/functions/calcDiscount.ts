export function calcDiscount(price: number, discount_price: number) {
  if (!discount_price) return null;

  const discountAmount = (1 - discount_price / price) * 100;

  return discountAmount.toFixed(1);
}
