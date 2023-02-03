const saveCartItems = (textLi, savedItems = []) => {
  savedItems.push(textLi);
  localStorage.setItem('cartItems', JSON.stringify(savedItems));
};

export default saveCartItems;