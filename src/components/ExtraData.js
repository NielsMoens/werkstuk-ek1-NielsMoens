/**
 * My ExtraData Components
 */

import Component from '../lib/components';
import Elements from '../lib/Elements';
import DataBaseManager from '../lib/DatabaseManager';
import BusinessNames from '../lib/BusinessNames';

class ExtraData extends Component {
  constructor() {
    super({
      name: 'extraInfo',
      model: {
        businessNames: null,
      },
      routerPath: '/registerPage/extraInfo/',
    });
    this.businessLoaded = false;
  }

  async loadBusinessNames() {
    if (!this.businessLoaded) {
      await BusinessNames.CheckRegistered()
        .then((data) => {
          this.model.businessNames = data;
          console.log((data));
        });
    }
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
    // extrainfoContainer.className = 'nothingtoseehere';
    extrainfoContainer.setAttribute('method', 'POST');
    extrainfoContainer.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA',
        classname: 'head',
      }),
    );
    const subtitle = document.createElement('p');
    subtitle.className = 'head__subtitle';
    subtitle.innerHTML = 'Profile Info';
    extrainfoContainer.appendChild(subtitle);

    // render in the right content for the right kind of users: business or visitor
    // Check the type of visitor that is stored in the local host
    // then load the right profile info form elements
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
          name: 'lastname',
          id: 'lastname',
          placeholder: 'lastname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          name: 'dateofbirth',
          id: 'dateofbirth',
          placeholder: 'dateofb',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          name: 'phonenum',
          id: 'phonenum',
          placeholder: 'phonenum',
          type: 'number',
        }),
      );
    } else if (type === 'business') {
      //  create a dropdown with all the business names fetched form the stadgent API
      const dropdown = document.createElement('select');
      dropdown.setAttribute('name', 'businessName');
      if (!this.model.businessNames) {
        extrainfoContainer.className = 'hide';
        await this.loadBusinessNames();
        this.businessLoaded = true;
      } else {
        extrainfoContainer.className = 'nothingtoseehere';
        this.model.businessNames.forEach((element) => {
          const option = document.createElement('option');
          option.setAttribute('value', element);
          option.innerHTML = element;
          dropdown.appendChild(option);
        });
      }

      extrainfoContainer.appendChild(dropdown);
      extrainfoContainer.append(
        document.createElement('option'),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
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
          name: 'lastname',
          id: 'lastname',
          placeholder: 'lastname',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
          name: 'dateofbirth',
          id: 'dateofbirth',
          placeholder: 'dateofbirth',
          type: 'text',
        }),
      );

      extrainfoContainer.appendChild(
        Elements.generateInput({
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
        classname: 'btn',
        onClick: async (event) => {
          event.preventDefault();
          if (type === 'business') {
            const user = new DataBaseManager('userdata', uid);
            console.log('user', user);
            //  [tempFix] Hier knijpen we de oogjes even dicht >.<
            const formData = new FormData(document.querySelector('.nothingtoseehere'));
            console.log('from', formData);
            //  save the form data in an object
            const userData = {};
            for (const data of formData.entries()) {
              userData[data[0]] = data[1];
            }
            console.log('userdata', userData);

            //  save the Business names in a seperate Object
            const registeredBusinesses = {
              userdata: user.doc,
              businessName: userData.businessName,
            };

            //  store/merge the form data in the firestore collection Userdata
            await user.savedata(userData, true)
              // store the registeredBusiness names in a seperate firestore collection
              .then(async () => {
                const registeredBusiness = new DataBaseManager('BusinessRegistered', uid);
                await registeredBusiness.BusinessRegistered(registeredBusinesses);
              });
          } else if (type === 'visitor') {
            const user = new DataBaseManager('userdata', uid);
            console.log('user', user);
            //  [tempFix] Hier knijpen we de oogjes even dicht >.<
            const formData = new FormData(document.querySelector('form'));
            console.log('from', formData);
            //  save the form data in an object
            const userData = {};
            for (const data of formData.entries()) {
              userData[data[0]] = data[1];
            }
            console.log('userdata', userData);
            await user.savedata(userData, true);
            //  save the Business names in a seperate Object
          }

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