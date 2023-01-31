const saveCartItems = (li) => {
  const itemArray = JSON.parse(localStorage.getItem('cartItems')) || [];
  const textLi = li.innerText;
  itemArray.push(textLi);
  localStorage.setItem('cartItems', JSON.stringify(itemArray));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
