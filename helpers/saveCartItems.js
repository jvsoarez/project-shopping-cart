const saveCartItems = (textLi, savedItems = []) => {
  savedItems.push(textLi);
  localStorage.setItem('cartItems', JSON.stringify(savedItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
