/**
 * My Product Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

const data = [
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

];
class ProductComponent extends Component {
  constructor() {
    super({
      name: 'product',
      model: {
        product: null,
      },
      routerPath: '/product/:id',
    });
    this.productLoaded = false;
  }

  loadProduct() {
    if (!this.productLoaded) {
      this.productLoaded = true;
      // eslint-disable-next-line radix
      this.model.product = data.find((p) => p.id === parseInt(this.props.id));
    }
  }

  render() {
    const { product } = this.model;

    //  create a product container
    const productContainer = document.createElement('div');

    this.loadProduct();

    // show the product
    if (!product) {
      productContainer.innerHTML = 'Product is loading...';
    } else {
      productContainer.appendChild(
        Elements.createHeader({
          textContent: this.model.product.productName,
        }),
      );
    }
    // return the home container
    return productContainer;
  }
}

export default ProductComponent;
