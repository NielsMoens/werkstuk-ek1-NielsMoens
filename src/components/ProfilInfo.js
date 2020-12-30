/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class ProfileInfo extends Component {
  constructor() {
    super({
      name: 'visitorDashboard',
      model: {},
      routerPath: '/visitorDashboard/profileInfo',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'profileInfo';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.ProfilInfo({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'ProfilInfo',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default ProfileInfo;