const fetchProducts = async () => {
  const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const response = await fetch(URL);
  const { results } = await response.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
