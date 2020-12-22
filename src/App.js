/**
 * The Aplication Wrapper
 */

import Component from './lib/components';
import Router from './Router';
// import initFirebase from './lib/Firebase';

class App {
  constructor(parent) {
    this.parent = parent;
    this.components = [];
    // initFirebase();
  }

  // kill off the unnessesary childern
  clearParent() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }

  addComponent(component) {
    if (!(component instanceof Component)) return;

    //  get the name from component
    const { name, routerPath } = component;

    //  when a compent asks to rerender
    component.reRender = () => this.showComponent(component);

    //  add to component array
    this.components.push(component);

    //  add to router
    Router.getRouter().on(routerPath, (props) => {
      this.showComponent({
        props,
        name,
      });
    }).resolve();
  }

  showComponent({ name, props }) {
    const foundComponent = this.components.find((component) => component.name === name);
    if (!foundComponent) return;
    this.clearParent();
    if (props) foundComponent.props = props;
    this.parent.appendChild(foundComponent.render());
  }
}

export default App;
