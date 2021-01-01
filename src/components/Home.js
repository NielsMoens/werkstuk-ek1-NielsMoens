/**
 * My Home Components
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
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'login';

    // create form container for login
    const form = homeContainer.appendChild(
      Elements.createForm(),
    );

    //  append from header
    form.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA',
      }),
    );

    //  append from header
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
        // NAME IS IMPORTANT
        name: 'password',
        id: 'password',
        placeholder: 'password',
        type: 'password',
      }),
    );

    const div = document.createElement('div');
    div.className = 'btn';
    form.appendChild(div);

    //  append a button
    div.appendChild(
      Elements.createButton({
        textContent: 'login',
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
          console.log('email', email);
          const response = await auth.login(email, password);
          if (!response) {
            // @TODO Show error
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

          // save the registerType to check which kind of user is trying to login
          // Then redirect the user to the right dashbaord
          let registerType = '';
          snapshot.forEach((doc) => {
            console.log('registerChoice', doc.get('registerChoice'));
            registerType = doc.get('registerChoice');
          });
          console.log(registerType);

          if (registerType === 'business') {
            console.log('joepieee BUSINESS', registerType);
            this.router.navigate('/businessDashboard');
          } else if (registerType === 'visitor') {
            console.log('joepieee visitor', registerType);
            this.router.navigate('/visitorDashboard');
          }
        },
      }),
    );

    div.appendChild(
      Elements.createButton({
        textContent: 'register',
        onClick: (event) => {
          event.preventDefault();
          this.router.navigate('/registerPage/');
        },
      }),
    );

    div.appendChild(
      Elements.createButton({
        textContent: 'Sign In With Google Account',
        onClick: async () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          const response = await firebase.auth().signInWithPopup(provider);
          if (!response) {
            // @TODO Show error
            console.log('aiiiii, gene response');
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