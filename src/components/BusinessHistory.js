/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class BusinessHistory extends Component {
  constructor() {
    super({
      name: 'visitorDashboard',
      model: {},
      routerPath: '/visitorDashboard/BusinessHistory',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'BusinessHistory';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.visDashboard({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'visitor',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default BusinessHistory;
