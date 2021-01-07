/**
 * My Extra Data Component
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

  // Load the all the Businesses
  async loadBusinessNames() {
    if (!this.businessLoaded) {
      await BusinessNames.CheckRegistered()
        .then((data) => {
          this.model.businessNames = data;
        });
    }
  }

  async render() {
    // First what we need is the reference of the user aka the uid
    const uid = localStorage.getItem('uid');

    // Create the same data reader as the old component
    const userDoc = new DataBaseManager('userdata', uid);

    // Then you can get the stored type from the userData stored for that specific user
    // (? = love the es next to filter directly on undefined's)
    const collectionData = await userDoc.getCollectionData();
    const type = collectionData.data()?.registerChoice;

    // Create extrainfo container
    const extrainfoContainer = document.createElement('form');
    extrainfoContainer.setAttribute('method', 'POST');
    extrainfoContainer.appendChild(
      Elements.createHeader({
        textContent: 'HORECONA',
        classname: 'form__head',
      }),
    );
    const subtitle = document.createElement('p');
    subtitle.className = 'head__subtitle';
    subtitle.innerHTML = 'Profile Info';
    extrainfoContainer.appendChild(subtitle);

    // Render in the right content for the right kind of users: business or visitor
    // Check the type of visitor that is stored in the local host
    // Then load the right profile info form elements
    if (type === 'visitor') {
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
      //  Create a dropdown with all the business names fetched form the stadgent API
      const dropdown = document.createElement('select');
      dropdown.setAttribute('name', 'businessName');
      dropdown.className = 'form__businessNames';
      if (!this.model.businessNames) {
        extrainfoContainer.className = 'hide';
        await this.loadBusinessNames();
        this.businessLoaded = true;
      } else {
        extrainfoContainer.className = 'nothingtoseehere form';
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

    // Create & append button -> store all the data in firestore
    extrainfoContainer.appendChild(
      Elements.createButton({
        textContent: 'Save & Continue',
        classname: 'btn',
        onClick: async (event) => {
          event.preventDefault();
          if (type === 'business') {
            const user = new DataBaseManager('userdata', uid);
            const formData = new FormData(document.querySelector('.nothingtoseehere'));

            //  Save the form data in an object
            const userData = {};
            for (const data of formData.entries()) {
              userData[data[0]] = data[1];
            }

            //  Save the Business names in a seperate Object
            const registeredBusinesses = {
              userdata: user.doc,
              businessName: userData.businessName,
            };

            /**
             *  Store/merge the form data in the firestore collection Userdata
             *  Then store the registeredBusiness names in a seperate firestore collection
            */
            await user.savedata(userData, true)
              .then(async () => {
                const registeredBusiness = new DataBaseManager('BusinessRegistered', uid);
                await registeredBusiness.BusinessRegistered(registeredBusinesses);
              });
          } else if (type === 'visitor') {
            const user = new DataBaseManager('userdata', uid);
            const formData = new FormData(document.querySelector('form'));

            //  save the form data in an object
            const userData = {};
            for (const data of formData.entries()) {
              userData[data[0]] = data[1];
            }
            //  save the Business names in a seperate Object
            await user.savedata(userData, true);
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