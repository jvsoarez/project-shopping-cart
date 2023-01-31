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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  const element = event.target;
  ol.removeChild(element);
  const savedItems = getSavedCartItems();
  const filteredList = savedItems.filter((item) => {
    const [item1] = element.innerText.split(' | ');
    const sku = item1.split(': ').pop();
    return !item.includes(sku);
  }); 
  localStorage.setItem('cartItems', JSON.stringify(filteredList));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addItemToCart() {
  const buttons = document.querySelectorAll('.item__add');
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const productId = btn.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText;
      const { id, title, price } = await fetchItem(productId);
      const li = createCartItemElement({ sku: id, name: title, salePrice: price });
      ol.appendChild(li);
      saveCartItems(li);
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
  const savedItems = getSavedCartItems();
  const ol = document.querySelector(CLASS_ORDERED_LIST);
  savedItems.forEach((item) => {
    const [item1, item2, item3] = item.split(' | ');
    const sku = item1.split(': ').pop();
    const name = item2.split(': ').pop();
    const salePrice = item3.split(': ').pop();
    const createItem = createCartItemElement({ sku, name, salePrice });
    ol.appendChild(createItem);
  });
}

window.onload = async () => {
  await listProducts();
  createCartItemFromStorage();
  addItemToCart();
};
