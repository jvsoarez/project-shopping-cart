# Project Shopping Cart 

![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

👋 Hey! this is the shopping cart, where you can choose one or more products, add to cart, remove one by one or remove all products.
The most complex part of this project was storing the items in localstorage, being able to close the page and, when returning later, the items remain in the cart. When you remove them from the cart, they are also removed from localstorage.

🔗 **Deployed [Here](https://comtech-shopping.surge.sh/)**

🌐 **API: [https://api.mercadolibre.com/sites/MLB/search?q=$computer](https://api.mercadolibre.com/sites/MLB/search?q=$computer)**

and

🌐 **API: [https://api.mercadolibre.com/items/${itemId}](https://api.mercadolibre.com/items/${itemId})**

💻 **To open this project on your machine:**

🐧 **Unix Systems:**

Clone this repository:

    git clone https://github.com/jvsoarez/project-shopping-cart.git
    
Enter in the directory
    
    cd project-shopping-cart
    
To install the dependencies:
    
    npm install

To open the project in the browser:
    
    npm run dev

or:
    
    npx vite --open
    
📍 Here I use **HTML**, **CSS**, **JS** and **JEST** for pratice the skills:

- Make requests to an API (Application Programming Interface) of the Mercado Livre;
- Use your knowledge of JavaScript, CSS and HTML;
- Work with asynchronous functions;
- Implement unit tests.

📖 **The project requirements were**:

**1. Create a product listing** ✔️

**2. Add the product to the shopping cart** ✔️

**3. Remove item from shopping cart by clicking on it** ✔️

**4. Load shopping cart from LocalStorage on page launch** ✔️

**5. Add up the total value of the shopping cart items** ✔️

**6. Implement logic in the Empty Cart button to clear the shopping cart** ✔️

**7. Add "loading" text during an API request** ✔️

**8. Develop tests of at least 25% full coverage and 100% of the fetchProducts function** ✔️

**9. Develop tests of at least 50% full coverage and 100% fetchItem function** ✔️

**10. Develop tests of at least 75% full coverage and 100% of the saveCartItems function** ✔️

**11. Develop tests to achieve 100% full coverage and 100% getSavedCartItems function** ✔️

🙏🏽 Thanks for viewing this repository!
