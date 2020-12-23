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
      model: {

      },
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
        name: 'email', id: 'email', placeholder: 'email', type: 'text',
      }),
    );

    form.appendChild(
      Elements.generateInput({
        // NAME IS IMPORTANT
        name: 'password', id: 'password', placeholder: 'password', type: 'password',
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
          const password = formData.get('password');
          const auth = new Authentication({ email, password });
          const response = await auth.login(email, password);
          if (!response) {
            // @TODO Show error
            return;
          }
          this.router.navigate('/products/');
        },
      }),
    );

    div.appendChild(
      Elements.createButton({
        textContent: 'register',
        onClick: async (event) => {
          event.preventDefault();
          const formData = new FormData(document.querySelector('form'));
          const email = formData.get('email');
          const password = formData.get('password');
          const auth = new Authentication({ email, password });
          const response = await auth.register(email, password);
          if (!response) {
            // @TODO Show error
            return;
          }
          this.router.navigate('/products/');
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
