require('../mocks/fetchSimulator');
// const {expect, jest, test} = require('@jest/globals');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it(`testa se o fetch é chamando, quando a função 
    fetchProducts é executada com um argumento`, async () => {
      await fetchProducts('computador');
      expect(fetch).toHaveBeenCalled();
  });

  it(`Testa se, ao chamar a função fetchProducts com o argumento "computador", 
    a função fetch utiliza o endpoint correto`, async () => {
      const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      await fetchProducts('computador');
      expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it(`Teste se o retorno da função fetchProducts com o argumento "computador" 
    é uma estrutura de dados igual ao objeto computadorSearch`, async () => {
      expect(await fetchProducts('computador')).toEqual(computadorSearch.results);
    });

    it(`Teste se, ao chamar a função fetchProducts sem argumento, 
      retorna um erro com a mensagem: You must provide an url`, async () => {
        try {
          await fetchProducts()
        } catch (error) {
          expect(error.message).toBe('You must provide an url');
        }
    });
});
