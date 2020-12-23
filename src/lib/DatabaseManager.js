/**
 * The compent parent
 */

import firebase from 'firebase';

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

  async getCollectionData() {
    return firebase.firestore().collection(this.collection).doc(this.doc).get();
  }
}
export default DataBaseManager;