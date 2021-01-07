/**
 * Visitor Dashboard Component
 */

import firebase from 'firebase/app';
import Component from '../lib/components';
import DataBaseManager from '../lib/DatabaseManager';
import Elements from '../lib/Elements';
import userdata from '../lib/userdata';
import BusinessNames from '../lib/BusinessNames';

class VisitorDashboard extends Component {
  constructor() {
    super({
      name: 'visitorDashboard',
      model: {},
      routerPath: '/visitorDashboard',
    });
  }

  async render() {
    //  Create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'visitorDashboard-container';

    // Get the data of the logged in user
    const userInfo = await userdata();

    const userId = localStorage.getItem('uid');

    //  Get the business keys for the checked in user
    const getBusinesKeyForCheckedInUser = async () => {
      const data = firebase.firestore().collection('saveCheckins');
      const snapshot = await data.get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
      const docData = {};

      /**
       *  Map over this of this to work with what is in this since you know firbase...
       *  Set docdata = the current businessKey and give it the correspondending userCheckInData
       */
      snapshot.forEach((doc) => {
        docData[doc.id] = doc.data();
      });

      /**
       *  After the map get the current user's checked-in bussiness (key to uncheck)
       *  but for this we need two loops:
       *  1) Getting all the user's their Id and data inside the business
       *  2) Getting the current user data & checks to verify it is checked in & the logged in user
       *  After all checking >.< ,we get a business key that can be used to check out
       */
      for (const businessKey of Object.keys(docData)) {
        const businessCheckins = docData[businessKey];
        for (const userDataKey of Object.keys(businessCheckins)) {
          if (!businessCheckins[userDataKey].active || userDataKey !== userId) {
            // eslint-disable-next-line no-continue
            continue;
          }
          return businessKey;
        }
      }
      return null;
    };

    const businesKey = await getBusinesKeyForCheckedInUser();

    /**
     *  First check if the user is checkin in a business, if not -> alert user to checkin in first
     *  Then if the users checks out, change the 'active' state
     *  in the 'saveCheckins' collection to false and add a new date
     */
    const checkout = async () => {
      if (!businesKey) {
        alert('You are not checked in yet');
        return;
      }
      const databaseManager = new DataBaseManager('saveCheckins', businesKey);
      databaseManager.updateData({ userId, active: false, date: new Date() });
    };
    window.checkout = checkout;

    // Load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.visDashboard({
        logout: '/',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
      }),
    );

    // Add map provided by mapbox
    document.getElementById('map').className = 'showMap';

    // CDN's are injected on the window by default since you import the script in the main index
    const accesstoken = 'pk.eyJ1IjoibmllbHNtb2VucyIsImEiOiJjanV3Z2w0c2gwNmdvNDRwZ3BvcGZtMGNwIn0.XhWcDDDcTVuFc3DkBPLTlg';
    const map = new window.mapboxgl.Map({
      accessToken: accesstoken,
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [3.733333, 51.049999], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    await BusinessNames.getRegistered()
      .then((response) => {
        for (const [key, value] of Object.entries(response)) {
          const mapboxClient = mapboxSdk({ accessToken: accesstoken });
          mapboxClient.geocoding
            .forwardGeocode({
              query: `${value.location}, Ghent`,
              autocomplete: false,
              limit: 1,
            })
            .send()
            // Set markers on the mapbox map
            .then((mapresponse) => {
              if (mapresponse && mapresponse.body
                && mapresponse.body.features
                && mapresponse.body.features.length
              ) {
                const feature = mapresponse.body.features[0];
                new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
              }
            });
        }
      });

    // return the home container
    return homeContainer;
  }
}
export default VisitorDashboard;