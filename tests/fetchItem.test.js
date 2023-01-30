require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se o fetch é chamado quando é passado um argumento específico para fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it(`Testa se, ao chamar a função com o argumento de um item, 
    a função fetch utiliza o end point correto`, async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it(`Testa se, ao chamar a função com o argumento de um item, 
    retorna com estrutura de dados correta`, async () => {
      expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it(`Testa se, ao chamar a função sem argumento, retorna o erro esperado`, async () => {
    try {
      await fetchItem()
    } catch (error) {
      expect(error.message).toBe('You must provide an url');
    }
  });
});
