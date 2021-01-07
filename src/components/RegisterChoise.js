/**
 * RegisterChoice Component
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
    //  Create a home container
    const registerContainer = document.createElement('form');
    registerContainer.setAttribute('method', 'POST');
    registerContainer.className = 'form';
    registerContainer.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA',
        classname: 'form__head',
      }),
    );

    //  Create and append email inputfield
    registerContainer.appendChild(
      Elements.generateInput({
        name: 'email',
        id: 'email',
        placeholder: 'email',
        type: 'text',
      }),
    );

    //  Create and Append password inputfield
    registerContainer.appendChild(
      Elements.generateInput({
        name: 'password',
        id: 'password',
        placeholder: 'password',
        type: 'password',
      }),
    );

    //  Create radio buttons for user choice
    const radioParent = document.createElement('section');
    radioParent.className = 'form__userChoice';
    const visitor = document.createElement('div');
    visitor.className = 'userChoice__visitorContainer';
    const business = document.createElement('div');
    business.className = 'userChoice__businessContainer';

    //  Create and append radio button visitor
    visitor.appendChild(
      Elements.generateInput({
        name: 'choice',
        id: 'visitor',
        type: 'radio',
        placeholder: 'visitor',
        value: 'visitor',
      }),
    );

    //  Create and append radio button business
    business.appendChild(
      Elements.generateInput({
        name: 'choice',
        id: 'business',
        type: 'radio',
        placeholder: 'business',
        value: 'business',
      }),
    );

    //  Create labels for radio buttons
    const labelB = document.createElement('label');
    labelB.innerHTML = 'Business';
    labelB.setAttribute('for', 'business');
    business.appendChild(labelB);

    const labelV = document.createElement('label');
    labelV.innerHTML = 'visitor';
    labelV.setAttribute('for', 'visitor');
    visitor.appendChild(labelV);

    // Append radiobuttons label to parent
    radioParent.appendChild(visitor);
    radioParent.appendChild(business);

    registerContainer.appendChild(radioParent);

    // Create & append button -> store all the data in firestore
    registerContainer.appendChild(
      Elements.createButton({
        textContent: 'Register & Continue',
        classname: 'btn__buttons',
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
          if (!response) {
            return;
          }

          // First initialize uid in localstorage for future reference
          const userUid = response.user.uid;
          window.localStorage.setItem('uid', userUid);
          window.localStorage.setItem('email', email);

          // Then save the data from that page in the database,
          // based on the uid (primary key) of the user as index
          const user = new DataBaseManager('userdata', userUid);
          await user.savedata({
            email,
            registerChoice,
          });

          // Next component is now ready to load
          await Promise.resolve(this.router.navigate('/registerPage/extraInfo/'));
        },
      }),
    );
    // Return the registerContainer
    return registerContainer;
  }
}

export default RegisterComponent;