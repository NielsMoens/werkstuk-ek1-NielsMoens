/**
 * My Home Components
 */

import firebase from 'firebase/app';
import Component from '../lib/components';
import Elements from '../lib/Elements';
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
    // const name = userinfo.firstname;
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
        console.log('registerChoice', doc.data());
        userinfo = doc.data();
      });
      console.log(userinfo);
      console.log(userinfo.firstname);
      return userinfo;
    };
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
    // const form = homeContainer.appendChild(
    //   Elements.createForm(),
    // );

    // const input = document.createElement('input');

    // return the home container
    return homeContainer;
  }
}
export default ProfileInfo;