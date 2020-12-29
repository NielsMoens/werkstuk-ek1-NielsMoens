/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class UniqueQRcode extends Component {
  constructor() {
    super({
      name: 'visitorDashboard',
      model: {},
      routerPath: '/businessDashboard/UniqueQRcode',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'visitorDashboard';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.UniqueQRcode({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'UniqueQRcode',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default UniqueQRcode;
