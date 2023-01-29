const fetchProducts = async (query) => {
  if (!query) {
    return new Error('You must provide an url');
  }
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(URL);
  const { results } = await response.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
