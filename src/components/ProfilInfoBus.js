/**
 * Profile Info business Component
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
    //  Create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'profileinfoContainer';

    /**
     *  Get the users email form the local storage
     *  Check in the userdata collection if there is a matching email
     *  Then Load in the userdata on the profile Info Page
     */
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
      return userinfo;
    };

    // Get the data of the logged in user
    const userInfo = await userdata();

    // Load in content with handlebars
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