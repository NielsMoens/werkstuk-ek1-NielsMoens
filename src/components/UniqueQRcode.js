/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class UniqueQRcode extends Component {
  constructor() {
    super({
      name: 'uniquecode',
      model: {},
      routerPath: '/businessDashboard/uniquecode',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'Activevisitor';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.UniqueQrcode({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'business',
        info: 'Unique QR-code',
      }),
    );

    const scanner = document.createElement('div');
    scanner.id = 'canvas';
    homeContainer.appendChild(scanner);
    // if search the uid from localhost in
    // eslint-disable-next-line no-undef
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: 'www.urdoinggreat.com',
      image: 'https://cdn.discordapp.com/emojis/788540965647679489.png',
      dotsOptions: {
        color: 'black',
        type: 'extra-rounded',
      },
      backgroundOptions: {
        color: 'white',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 20,
      },
    });
    qrCode.append(document.getElementById('canvas'));

    // return the home container
    return homeContainer;
  }
}
export default UniqueQRcode;