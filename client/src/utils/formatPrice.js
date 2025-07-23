// client/src/utils/formatPrice.js
export const formatPrice = (price) => {
  return `KES ${Number(price).toLocaleString('en-KE')}`;
};
