/**
 * Home Component
 */

import 'regenerator-runtime/runtime';
import firebase from 'firebase/app';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import Authentication from '../lib/Authentication';

class HomeComponent extends Component {
  constructor() {
    super({
      name: 'home',
      model: {},
      routerPath: '/',
    });
  }

  render() {
    //  Create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'login';

    //  Create form container for login
    const form = homeContainer.appendChild(
      Elements.createForm({
        classname: 'form',
      }),
    );

    form.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA',
        classname: 'form__headLogin',
      }),
    );

    form.appendChild(
      Elements.generateInput({
        name: 'email',
        id: 'email',
        placeholder: 'email',
        type: 'text',
      }),
    );

    form.appendChild(
      Elements.generateInput({
        name: 'password',
        id: 'password',
        placeholder: 'password',
        type: 'password',
      }),
    );

    //  Created button container
    const div = document.createElement('div');
    div.className = 'btn';
    form.appendChild(div);

    /**
     *  Append login button
     *  OnClick get the data from the form and check the user in firestore Authentication
     *  Then set the user id in the local storage
     */
    div.appendChild(
      Elements.createButton({
        textContent: 'login',
        classname: 'btn__buttons',
        onClick: async (event) => {
          event.preventDefault();
          const formData = new FormData(document.querySelector('form'));
          const email = formData.get('email');
          window.localStorage.setItem('email', email);
          const password = formData.get('password');
          const auth = new Authentication({
            email,
            password,
          });
          const response = await auth.login(email, password);
          if (!response) {
            return;
          }

          const userUid = response.user.uid;
          window.localStorage.setItem('uid', userUid);

          //  Check the firestore database on the email the user entered in the login form
          const userdata = firebase.firestore().collection('userdata');
          const snapshot = await userdata.where('email', '==', email).get();
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }

          // Save the registerType to check which kind of user is trying to login
          // Then redirect the user to the right dashbaord
          let registerType = '';
          snapshot.forEach((doc) => {
            registerType = doc.get('registerChoice');
          });

          if (registerType === 'business') {
            this.router.navigate('/businessDashboard');
          } else if (registerType === 'visitor') {
            this.router.navigate('/visitorDashboard');
          }
        },
      }),
    );

    //  Create and append a button that redirects you to the registerPage
    div.appendChild(
      Elements.createButton({
        textContent: 'register',
        classname: 'btn__buttons',
        onClick: (event) => {
          event.preventDefault();
          this.router.navigate('/registerPage/');
        },
      }),
    );

    //  Create and append a button the sign in with a google account
    form.appendChild(
      Elements.createButton({
        textContent: 'Sign In With Google Account',
        classname: 'btn__buttons',
        onClick: async () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          const response = await firebase.auth().signInWithPopup(provider);
          if (!response) {
            console.log('aiiiii, no response');
            return;
          }
          this.router.navigate('/products/');
        },
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default HomeComponent;