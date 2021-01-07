/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * My Home Components
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
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'visitorDashboard-container';

    const userInfo = await userdata();
    console.log(userInfo);
    const userId = localStorage.getItem('uid');
    //
    const getBusinesKeyForCheckedInUser = async () => {
      const data = firebase.firestore().collection('saveCheckins');
      const snapshot = await data.get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
      const docData = {};

      // First of all we map the shit out of this to work with our format since you know firbase...
      // We set docdata = the current businessKey and give it the correspondending userCheckInData
      snapshot.forEach((doc) => {
        docData[doc.id] = doc.data();
      });

      // after the map we have to get the current user's checked-in bussiness (key to uncheck)
      // but for this we need two loops
      // 1) Getting all the user's their Id and data inside the business
      // 2) getting the current user data & checks to verify it is
      // checked in & is the logged in user
      // after all check we 'should' get a business key that can be used to check out
      for (const businessKey of Object.keys(docData)) {
        const businessCheckins = docData[businessKey];
        console.log('businessCheckins', businessCheckins);
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
    console.log(businesKey);

    const checkout = async () => {
      if (!businesKey) {
        alert('You are not checked in yet');
        return;
      }
      const databaseManager = new DataBaseManager('saveCheckins', businesKey);
      databaseManager.updateData({ userId, active: false, date: new Date() });
    };

    // Sad fix :(
    window.checkout = checkout;

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.visDashboard({
        logout: '/',
        UserName: userInfo?.firstname + userInfo?.lastname,
        title: 'HORECONA',
        subtitle: 'visitor',
      }),
    );

    // add map provided by mapbox
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
      // eslint-disable-next-line no-undef
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
            // eslint-disable-next-line no-loop-func
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