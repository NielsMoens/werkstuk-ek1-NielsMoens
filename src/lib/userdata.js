/**
 * Userdata Function:
 * Get the email from the current users and search
 * the userdata collection on the firestore database
 */

import firebase from 'firebase/app';

const userdata = async () => {
  const email = localStorage.getItem('email');
  let userinfo = {};
  const data = firebase.firestore().collection('userdata');
  const snapshot = await data.where('email', '==', email).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return null;
  }
  snapshot.forEach((doc) => {
    userinfo = doc.data();
  });
  console.log(userinfo);
  return userinfo;
};
export default userdata;