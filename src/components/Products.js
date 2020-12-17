/**
 * My Products Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';
import Router from '../Router';

class ProductsComponent extends Component {
  constructor() {
    super({
      name: 'products',
      model: {
        products: [
          {
            id: 1,
            productName: 'Mijn eerste product',
          },
          {
            id: 2,
            productName: 'Mijn tweede product',
          },
          {
            id: 3,
            productName: 'Mijn derde product',
          },

        ],
      },
      routerPath: '/products',
    });
  }

  render() {
    const { products } = this.model;

    //  create a home container
    const productsContainer = document.createElement('div');

    const mappedProducts = this.model.products.map((product) => ({
      ...product,
      textContent: product.productName,

      href: `${Router.getRouter().link('/product')}/${product.id}`,
    }));

    // append products list
    if (products.length === 0) {
      productsContainer.innerHTML = 'No products Availeble';
    } else {
      productsContainer.appendChild(
        Elements.createList({
          items: mappedProducts,
        }),
      );
    }
    // return the home container
    return productsContainer;
  }
}

export default ProductsComponent;
