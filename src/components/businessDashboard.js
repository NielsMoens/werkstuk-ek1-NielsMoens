/**
 * My Home Components
 */
// import firebase from 'firebase/app';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

class BusinessDashboard extends Component {
  constructor() {
    super({
      name: 'businessDashboard',
      model: {},
      routerPath: '/businessDashboard',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'businessDashboard';

    const userInfo = await userdata();

    // load in content with handlebars
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
