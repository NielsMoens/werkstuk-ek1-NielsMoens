/**
 * The compent parent
 */

// import firebase from 'firebase';
import firebase from 'firebase/app';

class DataBaseManager {
  constructor(collection, doc) {
    this.collection = collection;
    this.doc = doc;
  }

  async savedata(data, merge = false) {
    await firebase.firestore().collection(this.collection).doc(this.doc).set(data, {
      merge,
    });
  }

  async updateData(data) {
    firebase.firestore().collection(this.collection).doc(this.doc).update({
      users: firebase.firestore.FieldValue.arrayUnion(data),
    })
      .catch(() => {
        firebase.firestore().collection(this.collection).doc(this.doc).set({ users: [data] });
      });
  }

  async removeUserFromArray(id) {
    firebase.firestore().collection(this.collection).doc(this.doc).update({
      users: firebase.firestore.FieldValue.arrayRemove(id),
    });
  }

  async BusinessRegistered(data) {
    await firebase.firestore().collection(this.collection).add(data, {
    });
  }

  async getCollectionData() {
    return firebase.firestore().collection(this.collection).doc(this.doc).get();
  }
}
export default DataBaseManager;