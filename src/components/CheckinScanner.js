/**
 * My Home Components
 */

import Component from '../lib/components';
import DataBaseManager from '../lib/DatabaseManager';
import Elements from '../lib/Elements';
import Qrscanner from '../lib/QrScanner';

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
      .then((message) => {
        const userId = localStorage.getItem('uid');
        const businessId = atob(message); // to text
        const saveCheckins = new DataBaseManager('saveCheckins', businessId);
        // check if userId already exist @TODO
        saveCheckins.updateData(userId);
        console.log(businessId);
      });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'CheckinScanner';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.CheckinScanner({
        logout: '/',
        UserName: 'Username',
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