import 'regenerator-runtime/runtime';
import './sass/main.scss';
import App from './App';
import { HomeComponent, ProductComponent, ProductsComponent } from './components';

const initApp = () => {
  const appContainer = document.getElementById('appContainer');

  const app = new App(appContainer);
  app.addComponent(new HomeComponent());
  app.addComponent(new ProductsComponent());
  app.addComponent(new ProductComponent());
};

window.addEventListener('load', initApp);
