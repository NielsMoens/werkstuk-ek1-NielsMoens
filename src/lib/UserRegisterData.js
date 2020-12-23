import firebase from 'firebase';

/**
 * The compent parent
 */
class User {
    constructor(collection, doc) {
       this.collection = collection;
       this.doc = doc
    }
    
    async savedata(data) {
        return firebase.firestore().collection(this.collection).doc(this.doc).set(data);
    }

}
export default User;