/**
 * My firebase Config
 */

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export default () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyBlaS48OMO6F4pjxvz5S9lK2JnDQWSWOVs',
    authDomain: 'mobdevprojecthorecona.firebaseapp.com',
    projectId: 'mobdevprojecthorecona',
    storageBucket: 'mobdevprojecthorecona.appspot.com',
    messagingSenderId: '51620309788',
    appId: '1:51620309788:web:9046194e8afa4e6ef2e8d9',
    measurementId: 'G-B09R5W5398',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};
