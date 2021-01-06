/**
 * My Elements helper
 *
 * */

import '../sass/main.scss';
import Handlebars from 'handlebars';
import handlebarsHeader from '../views/templates/handlebarsHeader';
import busDashboardHeader from '../views/templates/busDashboardHeader';
import visDashboard from '../views/templates/visDashboard';
import CheckinScanner from '../views/templates/CheckinScanner';
import UniqueQrcode from '../views/templates/UniQrcode';
import Activevisitor from '../views/templates/Activevisitor';
import BusinessHistory from '../views/templates/BusinessHistory';
import ProfilInfo from '../views/templates/ProfilInfo';
import ProfileInfoBus from '../views/templates/ProfilInfoBusiness';
import Visitorhistory from '../views/templates/Visitorhistory';

Handlebars.registerHelper('isdefined', (value) => {
  console.log('value', value);
  return value !== undefined;
});

const Elements = {
  //  handlebars elements
  handlebarsHeader(headerData) {
    const template = Handlebars.compile(handlebarsHeader);
    const header = template({ headerData });
    return header;
  },

  busDashboardHeader(busDashboard) {
    const template = Handlebars.compile(busDashboardHeader);
    const businessDashboard = template({ busDashboard });
    return businessDashboard;
  },
  visDashboard(visData) {
    const template = Handlebars.compile(visDashboard);
    const visitorDashboard = template({ visData });
    return visitorDashboard;
  },
  CheckinScanner(checkin) {
    const template = Handlebars.compile(CheckinScanner);
    const checkindata = template({ checkin });
    return checkindata;
  },
  UniqueQrcode(uniqueCode) {
    const template = Handlebars.compile(UniqueQrcode);
    const uniq = template({ uniqueCode });
    return uniq;
  },
  Activevisitor(activevisitor) {
    const template = Handlebars.compile(Activevisitor);
    const active = template({ activevisitor });
    return active;
  },
  BusinessHistory(busHistory) {
    const template = Handlebars.compile(BusinessHistory);
    const businesshis = template({ busHistory });
    return businesshis;
  },
  ProfilInfo(profilInfo) {
    const template = Handlebars.compile(ProfilInfo);
    const profinfo = template({ profilInfo });
    return profinfo;
  },
  ProfileInfoBus(profilInfoBusiness) {
    const template = Handlebars.compile(ProfileInfoBus);
    const profinfobus = template({ profilInfoBusiness });
    return profinfobus;
  },
  Visitorhistory(vishistory) {
    const template = Handlebars.compile(Visitorhistory);
    const vishisto = template({ vishistory });
    return vishisto;
  },

  generateInput(attributes) {
    const input = document.createElement('input');
    Object.keys(attributes).forEach((attrib) => {
      input.setAttribute(attrib, attributes[attrib]);
    });
    return input;
  },

  createForm({
    classname = '',
  }) {
    const form = document.createElement('form');
    form.className = classname;
    return form;
  },
  createDiv() {
    const div = document.createElement('div');
    return div;
  },

  createButton({
    textContent = '',
    onClick = null,
    classname = '',
  }) {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.className = classname;
    if (onClick) button.addEventListener('click', (event) => {
      onClick(event);
    });
    return button;
  },

  createHeader({
    size = 1,
    textContent = '',
    classname = '',
  }) {
    if (size < 1 || size > 6) return null;
    const header = document.createElement(`h${size}`);
    header.textContent = textContent;
    header.className = classname;
    return header;
  },

  createLink({
    href,
    textContent = '',
    target = '_self',
  }) {
    const a = document.createElement('a');
    if (href) a.href = href;
    a.textContent = textContent;
    a.target = target;
    return a;
  },

  createList({
    items = [],
    ordered = false,
  }) {
    const list = document.createElement(ordered ? 'ol' : 'ul');
    items.forEach(({
      textContent,
      href,
    }) => {
      const li = document.createElement('li');
      if (!href) li.textContent = textContent;
      else {
        li.appendChild(Elements.createLink({
          textContent,
          href,
        }));
      }
      list.appendChild(li);
    });
    return list;
  },
};

export default Elements;