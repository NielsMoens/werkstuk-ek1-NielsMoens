/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class BusinessDashboard extends Component {
  constructor() {
    super({
      name: 'businessDashboard',
      model: {},
      routerPath: '/businessDashboard',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'businessDashboard';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.busDashboardHeader({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'business',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default BusinessDashboard;
