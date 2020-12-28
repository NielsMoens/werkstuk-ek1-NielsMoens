/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class CheckinScanner extends Component {
  constructor() {
    super({
      name: 'CheckinScanner',
      model: {},
      routerPath: '/visitorDashboard/CheckinScanner',
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

    // return the home container
    return homeContainer;
  }
}
export default CheckinScanner;
