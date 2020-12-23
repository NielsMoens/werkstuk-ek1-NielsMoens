/**
 * My Products Components
 */

import 'regenerator-runtime/runtime';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import Authentication from '../lib/Authentication';
import Router from '../Router';
import User from '../lib/UserRegisterData';


class RegisterComponent extends Component {
  constructor() {
    super({
      name: 'register',
      model: {
        Users: [
          {
            id: 1,
            registerChoise: 'Visitor',
          },
          {
            id: 2,
            registerChoise: 'Bussiness',
          },
        ],
      },
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
        name: 'email', id: 'email', placeholder: 'email', type: 'text',
      }),
    );
    
    // append form email
    registerContainer.appendChild(
      Elements.generateInput({
        // NAME IS IMPORTANT
        name: 'password', id: 'password', placeholder: 'password', type: 'password',
      }),
    );
    
    // create radio buttons for user choice
    const radioParent = document.createElement('section');
    const visitor = document.createElement('div');
    const business = document.createElement('div');

    // append radio button visitor
    visitor.appendChild(
      Elements.generateInput({
        name: 'choice', id: 'visitor', type: 'radio', placeholder: 'visitor', value: 'visitor',
      }),
    );

    // append radio button business
    business.appendChild(
      Elements.generateInput({
        name: 'choice', id: 'business', type: 'radio', placeholder: 'business', value: 'business',
      }),
    );
    
    // create label for radio buttons 
    const label_b =  document.createElement('label');
    label_b.innerHTML = 'Business';
    label_b.setAttribute('for', 'business');
    business.appendChild(label_b);

    const label_v =  document.createElement('label');
    label_v.innerHTML = 'visitor';
    label_v.setAttribute('for', 'visitor');
    visitor.appendChild(label_v);

    // append radiobuttons label to parent 
    radioParent.appendChild(visitor);
    radioParent.appendChild(business);

    registerContainer.appendChild(radioParent);
    // return the home container
    
    registerContainer.appendChild(
      Elements.createButton({
        textContent: 'register',
        onClick: async (event) => {
          event.preventDefault();
          const formData = new FormData(document.querySelector('form'));
          const email = formData.get('email');
          const password = formData.get('password');
          const registerChoice = formData.get('choice');
          const auth = new Authentication({ email, password });
          const response = await auth.register(email, password);
          console.log(response)
          if (!response) {
            // @TODO Show error
            return;
          }
          const user = new User('userdata', response.user.uid);
          console.log(user.doc)
          const data = await user.savedata({
            email, registerChoice
          })
          console.log(data);
         
          this.router.navigate('/products/');
        },
      }),
    );

    return registerContainer;
    
  }
}

export default RegisterComponent;
