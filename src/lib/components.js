/**
 * The compent parent
 */

import Router from '../Router';

class Component {
  constructor({
    name, model, routerPath = null,
  }) {
    this.name = name;
    this.props = null;
    this.model = this.proxyModel(model);
    this.routerPath = routerPath;
    this.reRender = null;
    this.router = Router.getRouter();
  }

  proxyModel(model) {
    return new Proxy(model, {
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (this.reRender) this.reRender();
        return true;
      },
    });
  }
}

export default Component;
