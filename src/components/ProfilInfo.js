/**
 * My Home Components
 */

import firebase from 'firebase/app';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';
import 'regenerator-runtime/runtime';

class ProfileInfo extends Component {
  constructor() {
    super({
      name: 'profileInfo',
      model: {},
      routerPath: '/visitorDashboard/profileInfo',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'profileinfoContainer';

    const userInfo = await userdata();

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.ProfilInfo({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'visitor',
        info: 'ProfilInfo',
        firstname: userInfo?.firstname,
        lastname: userInfo?.lastname,
        dateofbirth: userInfo?.dateofbirth,
        phonenum: userInfo?.phonenum,
      }),
    );
    return homeContainer;
  }
}
export default ProfileInfo;