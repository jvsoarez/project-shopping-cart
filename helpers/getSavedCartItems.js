const getSavedCartItems = () => {
  const itemArray = localStorage.getItem('cartItems') || [];
  return itemArray;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
