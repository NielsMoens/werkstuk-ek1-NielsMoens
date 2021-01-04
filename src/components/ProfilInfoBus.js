/**
 * My Home Components
 */

import firebase from 'firebase/app';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import 'regenerator-runtime/runtime';

class ProfileInfoBus extends Component {
  constructor() {
    super({
      name: 'profileInfoBus',
      model: {},
      routerPath: '/businessDashboard/profileInfo',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'profileinfoContainer';

    const email = localStorage.getItem('email');
    const userdata = async () => {
      let userinfo = {};
      const data = firebase.firestore().collection('userdata');
      const snapshot = await data.where('email', '==', email).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
      snapshot.forEach((doc) => {
        userinfo = doc.data();
      });
      console.log(userinfo);
      return userinfo;
    };
    const userInfo = await userdata();

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.ProfileInfoBus({
        logout: '/businessDashboard',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'business',
        info: 'ProfilInfo',
        busName: userInfo?.businessName,
        Maxcapa: userInfo?.maxcapa,
        firstname: userInfo?.firstname,
        lastname: userInfo?.lastname,
        dateofbirth: userInfo?.dateofbirth,
        phonenum: userInfo?.phonenum,
      }),
    );
    return homeContainer;
  }
}
export default ProfileInfoBus;