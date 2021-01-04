import firebase from 'firebase/app';

const email = localStorage.getItem('email');
const userdata = async () => {
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