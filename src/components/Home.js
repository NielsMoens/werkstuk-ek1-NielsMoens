/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class HomeComponent extends Component {
  constructor() {
    super({
      name: 'home',
      model: {
        counter: 0,
      },
      routerPath: '/',
    });
  }

  incrementCounter() {
    this.model.counter += 1;
  }

  render() {
    const {
      counter,
    } = this.model;
    //  create a home container
    const homeContainer = document.createElement('div');

    //  append header
    homeContainer.appendChild(
      Elements.createHeader({
        textContent: `Current Value is: ${counter}`,
      }),
    );

    //  append a button
    homeContainer.appendChild(
      Elements.createButton({
        textContent: 'AHZO EEN KLET',
        onClick: () => { this.incrementCounter(); },
      }),
    );
    // return the home container
    return homeContainer;
  }
}

export default HomeComponent;
