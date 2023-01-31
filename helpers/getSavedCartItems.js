const getSavedCartItems = () => {
  const itemArray = JSON.parse(localStorage.getItem('cartItems')) || [];
  const arr = [];
  itemArray.forEach((item) => {
    arr.push(item.replace('$', ''));
  });
  return arr;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
