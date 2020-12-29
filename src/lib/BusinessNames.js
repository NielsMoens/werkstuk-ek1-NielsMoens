/*
 * get BusinessNames
 */

import firebase from 'firebase/app';
import 'firebase/firestore';

const BusinessNames = {
  //  Fetch  all the business data from the stad gent API
  //  special thanks to Kobe for explaining/helping ._.
  getAll: async () => new Promise((resolve) => {
    const url = 'https://data.stad.gent/api/records/1.0/search/?dataset=koop-lokaal-horeca&q=&rows=420&facet=postcode&facet=gemeente&refine.postcode=9000';
    fetch(url)
      .then((data) => data.json())
      .then(async (data) => {
        //  store only the business names and throw them in an array
        const result = [];
        for (const [, value] of Object.entries(data.records)) {
          result.push(value.fields.naam);
        }
        resolve(result);
      });
  }),

  //  Check if a business is already registered
  CheckRegistered: async () => new Promise((resolve) => {
    BusinessNames.getAll()
      .then(async (apiResults) => {
        firebase.firestore().collection('BusinessRegistered').get()
          .then((FireStoreRegisteredData) => {
            const filter = [];
            FireStoreRegisteredData.forEach((firestoreData) => {
              filter.push(firestoreData.data().businessName);
            });

            // Check if the Registered Business isn't allready registered
            // in the firestore db for the registered businesses
            // https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
            const res = apiResults.filter((item) => !filter.includes(item));
            console.log(res);
            resolve(res);
          });
      });
  }),
};

export default BusinessNames;