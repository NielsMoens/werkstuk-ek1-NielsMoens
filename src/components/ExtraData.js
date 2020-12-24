/* eslint-disable no-restricted-syntax */
/**
 * My Products Components
 */

import 'regenerator-runtime/runtime';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import DataBaseManager from '../lib/DatabaseManager';

class ExtraData extends Component {
  constructor() {
    super({
      name: 'extraInfo',
      model: {},
      routerPath: '/registerPage/extraInfo/',
    });
  }

  async render() {
    // first what we need is the reference of the user aka the uid
    const uid = localStorage.getItem('uid');

    // create the same data reader as the old component
    const userDoc = new DataBaseManager('userdata', uid);

    // Then you can get the stored type from the userData stored for that specific user
    // (? = love the es next to filter directly on undefined's)
    const collectionData = await userDoc.getCollectionData();
    const type = collectionData.data()?.registerChoice;
    console.log('userdoc', type);

    //  create container
    const extrainfoContainer = document.createElement('form');
    extrainfoContainer.setAttribute('method', 'POST');
    extrainfoContainer.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA profileInfo',
      }),
    );

    // render in the right content for the right kind of users: business or visitor
    // Check the type of visitor that is stored in the local host
    // to load the right profile info form elements
    if (type === 'visitor') {
      console.log('has visitor');
      //  append visitor container
      extrainfoContainer.appendChild(
        Elements.generateInput({
          name: 'firstname',
          id: 'firstname',
          placeholder: 'firstname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'lastname',
          id: 'lastname',
          placeholder: 'lastname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'dateofbirth',
          id: 'dateofbirth',
          placeholder: 'lastname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'phonenum',
          id: 'phonenum',
          placeholder: 'phonenum',
          type: 'number',
        }),
      );
    } else if (type === 'business') {
      console.log('business owner');
      extrainfoContainer.appendChild(
        Elements.generateInput({
          name: 'busName',
          id: 'busName',
          placeholder: 'business Name',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'maxcapa',
          id: 'maxcapa',
          placeholder: 'maximum capacity',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          name: 'firstname',
          id: 'firstname',
          placeholder: 'firstname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'lastname',
          id: 'lastname',
          placeholder: 'lastname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'dateofbirth',
          id: 'dateofbirth',
          placeholder: 'dateofbirth',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          // @important NAME IS IMPORTANT
          name: 'phonenum',
          id: 'phonenum',
          placeholder: 'phonenum',
          type: 'number',
        }),
      );
    }

    // create & append button -> store all the data in firestore
    extrainfoContainer.appendChild(
      Elements.createButton({
        textContent: 'Save & Continue',
        onClick: async (event) => {
          event.preventDefault();
          const user = new DataBaseManager('userdata', uid);
          console.log(user.doc);
          const formData = new FormData(document.querySelector('form'));

          const userData = {};
          for (const data of formData.entries()) {
            userData[data[0]] = data[1];
          }
          console.log(userData);
          await user.savedata(userData, true);
          if (type === 'visitor') {
            this.router.navigate('/visitorDashboard/');
          } else if (type === 'business') {
            this.router.navigate('/businessDashboard/');
          }
        },
      }),
    );
    return extrainfoContainer;
  }
}

export default ExtraData;