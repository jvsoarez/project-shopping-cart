const CLASS_ORDERED_LIST = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function savedItemsFromStorage() {
  const savedItemsArray = getSavedCartItems();
  const savedItems = JSON.parse(savedItemsArray);
  const arr = [];
  savedItems.forEach((item) => {
    arr.push(item.replace('$', ''));
  });
  return arr;
}

function sumItemsCartPrice() {
  const tagPrice = document.querySelector('.total-price');
  const priceArray = [];
  let sum = 0;
  const savedItems = savedItemsFromStorage();
  savedItems.forEach((item) => {
    const partsOfTheItem = item.split(' | ');
    const itemPrice = partsOfTheItem[2].split(': ').pop();
    priceArray.push(Number(itemPrice));
    sum = priceArray.reduce((count, price) => count + price, 0);
  });
  const formatedSum = sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  tagPrice.innerText = `Total: ${formatedSum}`;
}

function cartItemClickListener(event) {
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  const element = event.target;
  ol.removeChild(element);
  const savedItems = savedItemsFromStorage();
  const filteredList = savedItems.filter((item) => {
    const [item1] = element.innerText.split(' | ');
    const sku = item1.split(': ').pop();
    return !item.includes(sku);
  }); 
  localStorage.setItem('cartItems', JSON.stringify(filteredList));
  sumItemsCartPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${sku} | NAME: ${name} | PREÇO: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addItemToCart() {
  const buttons = document.querySelectorAll('.item__add');
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const createImage = createCustomElement('img', 'item-cart-image', '');
      const productId = btn.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText;
      const { id, title, price, thumbnail } = await fetchItem(productId);
      const li = createCartItemElement({ sku: id, name: title, salePrice: price });
      createImage.src = thumbnail;
      li.appendChild(createImage); 
      ol.appendChild(li);
      saveCartItems(li.innerText, savedItemsFromStorage());
      sumItemsCartPrice();
    });
  });
}

async function listProducts() {
  const sectionClassItems = document.querySelector('.items');
  const createSpan = document.createElement('span');
  createSpan.setAttribute('class', 'loading');
  createSpan.innerText = 'carregando...';
  sectionClassItems.appendChild(createSpan);
  const computersArray = await fetchProducts('computador');
  sectionClassItems.removeChild(createSpan);
  computersArray.forEach(({ id, title, thumbnail }) => {
  const computerObject = {
    sku: id,
    name: title,
    image: thumbnail,
  };
  sectionClassItems.appendChild(createProductItemElement(computerObject));
  });
}

function createCartItemFromStorage() {
  const savedItems = savedItemsFromStorage();
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  savedItems.forEach(async (item) => {
    const createImage = createCustomElement('img', 'item-cart-image', '');
    const [item1, item2, item3] = item.split(' | ');
    const sku = item1.split(': ').pop();
    const name = item2.split(': ').pop();
    const salePrice = item3.split(': ').pop();
    const { thumbnail } = await fetchItem(sku);
    const createItem = createCartItemElement({ sku, name, salePrice });
    createImage.src = thumbnail;
    createItem.appendChild(createImage); 
    ol.appendChild(createItem);
    sumItemsCartPrice();
  });
}

function emptyCartEvent() {
  const emptyCartButton = document.querySelector('.empty-cart');
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  const savedItems = savedItemsFromStorage();
  emptyCartButton.addEventListener('click', () => {
    ol.innerText = '';
    if (savedItems.length > 0) {
      savedItems.splice(0);
    }
    localStorage.setItem('cartItems', JSON.stringify(savedItems));
    sumItemsCartPrice();
  });
}

window.onload = async () => {
  await listProducts();
  addItemToCart();
  createCartItemFromStorage();
  emptyCartEvent();
};
