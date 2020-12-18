/**
 * Get Products
 */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Products = {
  getAll: async () => {
    //  get firestore
    const db = firebase.firestore();

    //  define the query
    const query = db.collection('products');

    // get the query snapshot
    const querySnapshot = await query.get();

    // loop over all documents
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  },
};

export default Products;
