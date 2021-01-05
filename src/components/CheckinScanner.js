/**
 * My Home Components
 */

import firebase from 'firebase/app';
import Component from '../lib/components';
import DataBaseManager from '../lib/DatabaseManager';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';
import Qrscanner from '../lib/QrScanner';
import { disableActiveCheckinsForUser } from '../lib/utils';

class CheckinScanner extends Component {
  constructor() {
    super({
      name: 'CheckinScanner',
      model: {

      },
      routerPath: '/visitorDashboard/CheckinScanner',
    });
  }

  async qrscanner() {
    await Qrscanner()
      .then(async (message) => {
        const userId = localStorage.getItem('uid');
        const businessId = atob(message); // to text
        const saveCheckins = new DataBaseManager('saveCheckins', businessId);
        // check if userId already exist @TODO

        await disableActiveCheckinsForUser(userId);

        saveCheckins.updateData({ userId, active: true, date: new Date() });
        console.log(businessId);
      });
  }

  async render() {
    const CheckIfUserExists = async () => {
      // const userId = localStorage.getItem('uid');
      const checkinData = firebase.firestore().collection('saveCheckins');
      const snapshot = await checkinData.get();
      const userinfo = {};
      snapshot.forEach((doc) => {
        userinfo[doc.id] = doc.data();
      });
      console.log('snap', userinfo);
      // if user is present in a previously check in business,
      // set active to false
      // for (const uid of Object.keys(userinfo)) {
      //   const uidPresent = userinfo[uid];
      //   console.log('uidpresent', uidPresent);
      //   if (uidPresent instanceof (userId)) {
      //     console.log('User is pressent ergens anders');
      //   }
      // }

      // if (userId === userinfo) {
      //   console.log('User is pressent ergens anders');
      // }
    };
    const userInPressent = await CheckIfUserExists();
    console.log(userInPressent);
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'CheckinScanner';

    const userInfo = await userdata();
    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.CheckinScanner({
        logout: '/visitorDashboard',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'Scan QR-code from business:',
      }),
    );

    const scanner = document.createElement('div');
    scanner.id = 'reader';
    homeContainer.appendChild(scanner);
    this.qrscanner();

    // return the home container
    return homeContainer;
  }
}
export default CheckinScanner;