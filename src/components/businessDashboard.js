/**
 * Business Dashboard Component
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

class BusinessDashboard extends Component {
  constructor() {
    super({
      name: 'BusinessDashboard',
      model: {},
      routerPath: '/businessDashboard',
    });
  }

  async render() {
    //  Create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'businessDashboard';

    // Get the data of the logged in user
    const userInfo = await userdata();

    // Load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.busDashboardHeader({
        logout: '/',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'business',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default BusinessDashboard;
