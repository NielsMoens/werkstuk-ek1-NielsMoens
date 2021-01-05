import firebase from 'firebase/app';
import DataBaseManager from './DatabaseManager';

/* eslint-disable import/prefer-default-export */

// When checking into a new business we have to disable the old checkins
export const disableActiveCheckinsForUser = async (userId) => {
  const data = firebase.firestore().collection('saveCheckins');
  const snapshot = await data.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  const docData = {};

  // Mapping the data to work as key-value (businessId-buisnessData)
  snapshot.forEach((doc) => {
    docData[doc.id] = doc.data();
  });

  /**  Loop over all the registered businesses
   *   to check if the user exists
   *   & is active -> set active false and save the new date */
  for (const businessKey of Object.keys(docData)) {
    const businessCheckins = docData[businessKey];
    for (const userDataKey of Object.keys(businessCheckins)) {
      if (businessCheckins[userDataKey].active && userDataKey === userId) {
        const databaseManager = new DataBaseManager('saveCheckins', businessKey);
        databaseManager.updateData({ userId, active: false, date: new Date() });
      }
    }
  }
};

// getting all the checked users from the selected business (businessId)
export const getAllCheckedInBusiness = async (businessId) => {
  const data = firebase.firestore().collection('saveCheckins');
  const snapshot = await data.get();
  if (snapshot.empty) {
    console.log('Business do not have checkins');
    return null;
  }

  let businessData;

  // Find the current business in database docs
  snapshot.forEach((doc) => {
    if (doc.id !== businessId) {
      return;
    }
    businessData = doc.data();
  });

  // Make sure there is a business for Id
  if (!businessData) {
    console.log('No business found');
    return null;
  }

  const activeUsers = [];

  /** Loop all users when the user is active
   *  we push the userdata (id) and
   *  it's latest date to an array of active users */
  for (const userDataKey of Object.keys(businessData)) {
    if (!businessData[userDataKey].active) {
      continue;
    }
    const userData = businessData[userDataKey];
    activeUsers.push({
      id: userDataKey,
      lastDate: new Date(userData.dates[userData.dates.length - 1] * 1000),
    });
  }

  return activeUsers;
};

// Getting all the userData by userId
export const getUserData = async (userId) => {
  const users = firebase.firestore().collection('userdata');
  const userDocument = await users.doc(userId).get();

  if (!userDocument) {
    console.log('NO FACKING USER FOUND');
    return null;
  }

  return userDocument.data();
};