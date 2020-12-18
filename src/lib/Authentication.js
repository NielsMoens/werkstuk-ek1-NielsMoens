import firebase from 'firebase';

export default class Authentication {
  constructor(userData) {
    this.userData = userData;
  }

  async login() {
    const { email, password } = this.userData;
    try {
      const data = await firebase.auth().signInWithEmailAndPassword(email, password);
      return data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  static async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const data = await firebase.auth().signInWithPopup(provider);
      return data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async register() {
    const { email, password } = this.userData;
    try {
      console.log(firebase);
      const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return data;
    } catch (e) {
      console.log(e);
    }
    return null;
  }
}
