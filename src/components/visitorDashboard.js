/**
 * My Home Components
 */
import Component from '../lib/components';
import Elements from '../lib/Elements';

class VisitorDashboard extends Component {
  constructor() {
    super({
      name: 'visitorDashboard',
      model: {},
      routerPath: '/visitorDashboard',
    });
  }

  render() {
    //  create a home container
    const homeContainer = document.createElement('div');
    homeContainer.className = 'visitorDashboard';

    // load in content with handlebars
    homeContainer.insertAdjacentHTML('afterbegin',
      Elements.visDashboard({
        logout: '/',
        UserName: 'Username',
        title: 'HORECONA',
        subtitle: 'visitor',
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