const getSavedCartItems = () => {
  const itemArray = localStorage.getItem('cartItems') || '[]';
  return itemArray;
};

export default getSavedCartItems;