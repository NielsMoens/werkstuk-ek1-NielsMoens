/**
 * My Home Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';

class BussinessInfo extends Component {
  constructor() {
    super({
      name: 'BussinessInfo',
      model: {},
      routerPath: '/businessDashboard/BussinessInfo',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'BussinessInfo';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.BussinesInfo({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'Business',
        info: 'Bussines Info',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default BussinessInfo;
