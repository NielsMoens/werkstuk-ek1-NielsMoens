/**
 * Business History Component
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

class BusinessHistory extends Component {
  constructor() {
    super({
      name: 'BusinessHistory',
      model: {},
      routerPath: '/visitorDashboard/BusinessHistory',
    });
  }

  async render() {
    //  Create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'BusinessHistory';

    // Get the data of the logged in user
    const userInfo = await userdata();

    // Load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.BusinessHistory({
        logout: '/visitorDashboard',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'Business History',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default BusinessHistory;
