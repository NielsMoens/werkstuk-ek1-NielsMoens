/**
 * My Home Components
 */

import firebase from 'firebase/app';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

class UniqueQRcode extends Component {
  constructor() {
    super({
      name: 'uniquecode',
      model: {},
      routerPath: '/businessDashboard/uniquecode',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'Activevisitor';

    const userInfo = await userdata();

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.UniqueQrcode({
        logout: '/businessDashboard',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'business',
        info: 'Unique QR-code',
      }),
    );

    const businessData = async () => {
      let busData = {};
      const uid = localStorage.getItem('uid');
      const data = firebase.firestore().collection('BusinessRegistered');
      console.log(data);
      const snapshot = await data.where('userdata', '==', uid).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
      snapshot.forEach((doc) => {
        console.log('registerChoice', doc.data());
        busData = doc.data();
      });
      return busData;
    };
    const businessInfo = await businessData();

    console.log(btoa(businessInfo.userdata));

    const scanner = document.createElement('div');
    scanner.id = 'canvas';
    homeContainer.appendChild(scanner);
    // if search the uid from localhost in
    // eslint-disable-next-line no-undef
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      // super secure shizzle hier
      data: btoa(businessInfo.userdata), // to base64
      image: 'https://cdn.discordapp.com/emojis/788540965647679489.png',
      dotsOptions: {
        color: 'black',
        type: 'classic',
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