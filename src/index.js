import 'regenerator-runtime/runtime';
import './sass/main.scss';
import App from './App';
import initFirebase from './lib/Firebase';
import { HomeComponent, ExtraData, RegisterComponent } from './components';

const initApp = () => {
  initFirebase();
  const appContainer = document.getElementById('appContainer');

  const app = new App(appContainer);
  app.addComponent(new HomeComponent());
  app.addComponent(new RegisterComponent());
  app.addComponent(new ExtraData());
};

window.addEventListener('load', initApp);
