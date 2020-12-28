/**
 * My Products Components
 */

import 'regenerator-runtime/runtime';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import Authentication from '../lib/Authentication';
import DataBaseManager from '../lib/DatabaseManager';

class RegisterComponent extends Component {
  constructor() {
    super({
      name: 'register',
      model: {},
      routerPath: '/registerPage',
    });
  }

  render() {
    //  create a home container
    const registerContainer = document.createElement('form');
    registerContainer.setAttribute('method', 'POST');
    registerContainer.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA',
      }),
    );

    //  append form email
    registerContainer.appendChild(
      Elements.generateInput({
        name: 'email',
        id: 'email',
        placeholder: 'email',
        type: 'text',
      }),
    );

    // append form email
    registerContainer.appendChild(
      Elements.generateInput({
        // NAME IS IMPORTANT
        name: 'password',
        id: 'password',
        placeholder: 'password',
        type: 'password',
      }),
    );

    // create radio buttons for user choice
    const radioParent = document.createElement('section');
    const visitor = document.createElement('div');
    const business = document.createElement('div');

    // append radio button visitor
    visitor.appendChild(
      Elements.generateInput({
        name: 'choice',
        id: 'visitor',
        type: 'radio',
        placeholder: 'visitor',
        value: 'visitor',
      }),
    );

    // append radio button business
    business.appendChild(
      Elements.generateInput({
        name: 'choice',
        id: 'business',
        type: 'radio',
        placeholder: 'business',
        value: 'business',
      }),
    );

    // create label for radio buttons
    const labelB = document.createElement('label');
    labelB.innerHTML = 'Business';
    labelB.setAttribute('for', 'business');
    business.appendChild(labelB);

    const labelV = document.createElement('label');
    labelV.innerHTML = 'visitor';
    labelV.setAttribute('for', 'visitor');
    visitor.appendChild(labelV);

    // append radiobuttons label to parent
    radioParent.appendChild(visitor);
    radioParent.appendChild(business);

    registerContainer.appendChild(radioParent);

    // create & append button -> store all the data in firestore
    registerContainer.appendChild(
      Elements.createButton({
        textContent: 'Register & Continue',
        onClick: async (event) => {
          event.preventDefault();
          const formData = new FormData(document.querySelector('form'));
          const email = formData.get('email');
          const password = formData.get('password');
          const registerChoice = formData.get('choice');
          const auth = new Authentication({
            email,
            password,
          });
          const response = await auth.register(email, password);
          console.log(response);
          if (!response) {
            // @TODO Show error
            return;
          }
          // first initialize uid in localstorage for future reference
          const userUid = response.user.uid;
          window.localStorage.setItem('uid', userUid);

          // Then save the data from that page in the database,
          // based on the uid (primary key) of the user as index
          const user = new DataBaseManager('userdata', userUid);
          await user.savedata({
            email,
            registerChoice,
          });

          // next component is now ready to load
          this.router.navigate('/registerPage/extraInfo/');
        },
      }),
    );
    // return the home container
    return registerContainer;
  }
}

export default RegisterComponent;