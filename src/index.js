import './sass/main.scss';
import App from './App';
import { HomeComponent, ProductComponent, ProductsComponent } from './components';

const initApp = () => {
  const appContainer = document.getElementById('appContainer');

  const app = new App(appContainer);
  app.addComponent(new HomeComponent());
  app.addComponent(new ProductsComponent());
  app.addComponent(new ProductComponent());
  //  DIT HOEFT NIET WANT DE ROUTER WEET DAT OP MIJN ROOT THE HOME COMPONENT MOE GAAN
  // app.showComponent({
  //   name: 'home',
  // });

  // Router.getRouter().on('/test', () => {
  //   console.log('testing...');
  // }).resolve();
};

window.addEventListener('load', initApp);

// const header = Elements.createHeader({
//   textContent: 'Checkt da vinneke ...',
// });

// const button = Elements.createButton({
//   textContent: 'Ahzo ken klet peeken!',
//   onClick: () => {
//     appContainer.appendChild(header);
//   },
// });

// const link = Elements.createLink({
//   href: 'https://www.youtube.com/watch?v=GMZWRP1K7WU',
//   textContent: 'pureGoldContent !',
//   target: '_blank',
// });

// const listData = [
//   {
//     textContent: 'julienke',
//   },
//   {
//     textContent: 'pizzaaaaa',
//   },
// ];

// const list = Elements.createList({
//   items: listData,
// });

// appContainer.appendChild(list);
// appContainer.appendChild(link);
// appContainer.appendChild(button);
