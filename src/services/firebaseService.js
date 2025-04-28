import { db } from '../firebase'; // Adjust path if needed
import { collection, getDocs, doc, deleteDoc,setDoc  } from 'firebase/firestore';

// Fetch all products
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  await deleteDoc(doc(db, 'products', productId));
};

// Fetch all promotions
export const getPromotions = async () => {
  const querySnapshot = await getDocs(collection(db, 'promotions'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete a promotion by ID
export const deletePromotion = async (promotionId) => {
  await deleteDoc(doc(db, 'promotions', promotionId));
};
// 🆕 Save a promotion (create or update)
export const savePromotion = async (promotionId, promotionData) => {
  if (promotionId) {
    // Update existing promotion
    await setDoc(doc(db, 'promotions', promotionId), promotionData, { merge: true });
  } else {
    // Create new promotion (with random ID)
    const newDocRef = doc(collection(db, 'promotions'));
    await setDoc(newDocRef, promotionData);
  }
};

// Save a product (create or update)
export const saveProduct = async (productId, productData) => {
  if (productId) {
    // Update existing product
    await setDoc(doc(db, 'products', productId), productData, { merge: true });
  } else {
    // Create a new product
    const newDocRef = doc(collection(db, 'products'));
    await setDoc(newDocRef, productData);
  }
};
