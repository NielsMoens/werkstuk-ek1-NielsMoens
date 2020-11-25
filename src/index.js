/* eslint-disable import/no-named-as-default */
/* eslint linebreak-style: ["error", "windows"] */
import './sass/main.scss';
// eslint-disable-next-line import/no-named-as-default-member
import Elements from './lib/Elements';

const appContainer = document.getElementById('appContainer');
const header = Elements.createHeader({
  textContent: 'Checkt da vinneke ...',
});

const button = Elements.createButton({
  textContent: 'Ahzo ken klet peeken!',
  onClick: () => {
    appContainer.appendChild(header);
  },
});

const link = Elements.createLink({
  href: 'https://www.youtube.com/watch?v=GMZWRP1K7WU',
  textContent: 'pureGoldContent !',
  target: '_blank',
});

appContainer.appendChild(link);
appContainer.appendChild(button);
