/**
 * My Home Components
 */
import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

class Activevisitor extends Component {
  constructor() {
    super({
      name: 'Activevisitor',
      model: {},
      routerPath: '/businessDashboard/Activevisitor',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'Activevisitor';

    const userInfo = await userdata();
    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.Activevisitor({
        logout: '/',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'Active visitors',
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default Activevisitor;
