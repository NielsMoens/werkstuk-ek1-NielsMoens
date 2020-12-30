import 'regenerator-runtime/runtime';
import './sass/main.scss';
import App from './App';
import initFirebase from './lib/Firebase';
import {
  HomeComponent,
  ExtraData,
  RegisterComponent,
  BusinessDashboard,
  VisitorDashboard,
  CheckinScanner,
  UniqueQRcode,
  Activevisitor,
  BusinessHistory,
  ProfilInfo,
  Visitorhistory,
  BussinesInfo,
} from './components';

const initApp = () => {
  initFirebase();
  const appContainer = document.getElementById('appContainer');
  const app = new App(appContainer);

  app.addComponent(new HomeComponent());
  app.addComponent(new RegisterComponent());
  app.addComponent(new ExtraData());
  app.addComponent(new BusinessDashboard());
  app.addComponent(new VisitorDashboard());
  app.addComponent(new CheckinScanner());
  app.addComponent(new UniqueQRcode());
  app.addComponent(new BusinessHistory());
  app.addComponent(new Activevisitor());
  app.addComponent(new Visitorhistory());
  app.addComponent(new ProfilInfo());
  app.addComponent(new BussinesInfo());
};

window.addEventListener('load', initApp);