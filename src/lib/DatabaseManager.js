/**
 * The DataBaseManager
 */

// import firebase from 'firebase';
import firebase from 'firebase/app';

class DataBaseManager {
  constructor(collection, doc) {
    this.collection = collection;
    this.doc = doc;
  }

  //  Save/merge data to the firestore database
  async savedata(data, merge = false) {
    await firebase.firestore().collection(this.collection).doc(this.doc).set(data, {
      merge,
    });
  }

  /** Update arrays -> [userId] is the current user where
  * we set if the user is active with the curresponding
  * date of checkin or checkout
  * (if active last element in date array == checkin date else if !active checkout date)
  * first we check if the user exist if so we set the new data & merge it with the old
  * if there is no user yet, we initially set the user with it's data
  */
  async updateData(data) {
    firebase.firestore().collection(this.collection).doc(this.doc).set({
      [data.userId]: {
        active: data.active,
        dates: firebase.firestore.FieldValue.arrayUnion(data.date),
      },
    }, { merge: true })
      .catch(() => {
        firebase.firestore().collection(this.collection).doc(this.doc)
          .set({ [data.userId]: { active: data.active, dates: [data.date] } });
      });
  }

  //  Remove users from the firestore database array
  async removeUserFromArray(id) {
    firebase.firestore().collection(this.collection).doc(this.doc).update({
      users: firebase.firestore.FieldValue.arrayRemove(id),
    });
  }

  //  Add a registered business to the registeredBusiness collection on the firestore database
  async BusinessRegistered(data) {
    await firebase.firestore().collection(this.collection).add(data, {
    });
  }

  //  Get data form a firestore collection
  async getCollectionData() {
    return firebase.firestore().collection(this.collection).doc(this.doc).get();
  }
}
export default DataBaseManager;