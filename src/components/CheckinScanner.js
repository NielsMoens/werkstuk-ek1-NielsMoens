/**
 * Checkin Scanner Component
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

  /**
   *  Load the QR-code scanner
   *  Check if the user is not checkin somewhere else, if so-> set active=false
   *  When the qr code is scanned update the users active state to true in the database
   * */
  async qrscanner() {
    await Qrscanner()
      .then(async (message) => {
        const userId = localStorage.getItem('uid');
        const businessId = atob(message); // to text
        const saveCheckins = new DataBaseManager('saveCheckins', businessId);

        await disableActiveCheckinsForUser(userId);

        saveCheckins.updateData({ userId, active: true, date: new Date() });
      });
  }

  async render() {
    const CheckIfUserExists = async () => {
      const checkinData = firebase.firestore().collection('saveCheckins');
      const snapshot = await checkinData.get();
      const userinfo = {};
      snapshot.forEach((doc) => {
        userinfo[doc.id] = doc.data();
      });
    };
    // eslint-disable-next-line no-unused-vars
    const userInPressent = await CheckIfUserExists();

    //  Create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'CheckinScanner';

    const userInfo = await userdata();
    // Load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.CheckinScanner({
        logout: '/visitorDashboard',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'Scan QR-code from business:',
      }),
    );

    //  Create container for the scanner
    const scanner = document.createElement('div');
    scanner.id = 'reader';
    homeContainer.appendChild(scanner);
    this.qrscanner();

    // return the home container
    return homeContainer;
  }
}
export default CheckinScanner;