/**
 * The compent parent
 */
class Component {
  constructor({
    name, model, routerPath = null,
  }) {
    this.name = name;
    this.props = null;
    this.model = this.proxyModel(model);
    this.routerPath = routerPath;
    this.reRender = null;
  }

  proxyModel(model) {
    return new Proxy(model, {
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (this.reRender) this.reRender();
        return true;
        /*
         *  ^^ The set method should return a boolean value.
         *  Return true to indicate that assignment succeeded.
         *  if not you get a type error
         */
      },
    });
  }

  // render() {
  //   const { counter } = this.model;

  //   // create a home container
  //   const homeContainer = document.createElement('div');

  //   // append header
  //   homeContainer.appendChild(
  //     Elements.createHeader({
  //       textContent: `Current value is: ${counter}`,
  //     }),
  //   );

  //   //  return the home container
  //   return homeContainer;
  // }
}

export default Component;
