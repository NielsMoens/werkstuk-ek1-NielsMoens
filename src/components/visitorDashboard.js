/**
 * My Home Components
 */

import Component from '../lib/components';
import DataBaseManager from '../lib/DatabaseManager';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';

class VisitorDashboard extends Component {
  constructor() {
    super({
      name: 'visitorDashboard',
      model: {},
      routerPath: '/visitorDashboard',
    });
  }

  async render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'visitorDashboard';

    const userInfo = await userdata();

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.visDashboard({
        logout: '/',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
      }),
    );
    const checkout = async (/* businessId */) => {
      const userId = localStorage.getItem('uid');
      /* const data = firebase.firestore().collection('saveCheckins').doc(businessId);
      const snapshot = await data.where('users', '==', userId).get();
      if (!snapshot) {
        console.log('user is not checked in');
      } else { */
      const databaseManager = new DataBaseManager('saveCheckins', 'sHeLPW0dvNaMJt7bf4ifNgp5OUM2');
      databaseManager.removeUserFromArray(userId);
      // }
    };
    homeContainer.append(
      Elements.createButton({
        textContent: 'check out',
        onClick: async () => {
          await checkout();
        },
      }),
    );
    // add map provided by mapbox
    document.getElementById('map').className = 'showMap';

    // CDN's are injected on the window by default since you import the script in the main index
    const map = new window.mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibmllbHNtb2VucyIsImEiOiJjanV3Z2w0c2gwNmdvNDRwZ3BvcGZtMGNwIn0.XhWcDDDcTVuFc3DkBPLTlg',
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [3.733333, 51.049999], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    map.addControl(
      // eslint-disable-next-line no-undef
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    // return the home container
    return homeContainer;
  }
}
export default VisitorDashboard;