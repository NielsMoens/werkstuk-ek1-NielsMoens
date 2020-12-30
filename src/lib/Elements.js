/**
 * My Elements helper
 *
 * */

import '../sass/main.scss';
import handlebarsHeader from '../views/templates/handlebarsHeader';
import busDashboardHeader from '../views/templates/busDashboardHeader';
import visDashboard from '../views/templates/visDashboard';
import CheckinScanner from '../views/templates/CheckinScanner';
import UniqueQRcode from '../views/templates/UniqueQRcode';
import Activevisitor from '../views/templates/Activevisitor';
import BusinessHistory from '../views/templates/BusinessHistory';
import ProfilInfo from '../views/templates/ProfilInfo';
import Visitorhistory from '../views/templates/Visitorhistory';
import BussinesInfo from '../views/templates/BussinesInfo';

const Handlebars = require('handlebars');

const Elements = {
  //  handlebars elements
  handlebarsHeader(headerData) {
    const template = Handlebars.compile(handlebarsHeader);
    const header = template({ headerData });
    return header;
  },

  busDashboardHeader(headerData) {
    const template = Handlebars.compile(busDashboardHeader);
    const businessDashboard = template({ headerData });
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
  UniqueQRcode(checkin) {
    const template = Handlebars.compile(UniqueQRcode);
    const checkindata = template({ checkin });
    return checkindata;
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
  Visitorhistory(vishistory) {
    const template = Handlebars.compile(Visitorhistory);
    const vishisto = template({ vishistory });
    return vishisto;
  },
  BussinesInfo(busInfo) {
    const template = Handlebars.compile(BussinesInfo);
    const businessInfo = template({ busInfo });
    return businessInfo;
  },

  generateInput(attributes) {
    const input = document.createElement('input');
    Object.keys(attributes).forEach((attrib) => {
      input.setAttribute(attrib, attributes[attrib]);
    });
    return input;
  },

  createForm() {
    const form = document.createElement('form');
    return form;
  },
  createDiv() {
    const div = document.createElement('div');
    return div;
  },

  createButton({
    textContent = '',
    onClick = null,
  }) {
    const button = document.createElement('button');
    button.textContent = textContent;
    if (onClick) button.addEventListener('click', (event) => {
      onClick(event);
    });
    return button;
  },
  // createGooglesignin() {
  //   const img = document.createElement('img');
  //   img.src = 'src/assets/btn_google_signin_light_pressed_web.png';
  //   // if (onClick)img.addEventListener('click', (event) => { onClick(event); });
  //   return img;
  // },

  createHeader({
    size = 1,
    textContent = '',
  }) {
    if (size < 1 || size > 6) return null;
    const header = document.createElement(`h${size}`);
    header.textContent = textContent;
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