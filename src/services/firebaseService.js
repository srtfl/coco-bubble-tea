import { db } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Categories
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    const sanitizedValue = categoryData.value.replace(/[^a-zA-Z0-9-_]/g, '-');
    const categoryRef = doc(collection(db, 'categories'), sanitizedValue);
    await setDoc(categoryRef, {
      value: sanitizedValue,
      displayName: categoryData.displayName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error in addCategory:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const categoryRef = doc(db, 'categories', id);
    await setDoc(categoryRef, {
      value: categoryData.value,
      displayName: categoryData.displayName,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const categoryRef = doc(db, 'categories', id);
    await deleteDoc(categoryRef);
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
};

// Products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const productRef = doc(collection(db, 'products'));
    await setDoc(productRef, {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return productRef.id; // Return the new document ID
  } catch (error) {
    console.error('Error in addProduct:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const productRef = doc(db, 'products', id);
    await setDoc(productRef, {
      ...productData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
};

// Wrapper function for adding/updating products
export const saveProduct = async (productData) => {
  try {
    if (productData.id) {
      // If product has an ID, update it
      await updateProduct(productData.id, productData);
      return productData.id;
    } else {
      // If no ID, add a new product
      const newId = await addProduct(productData);
      return newId;
    }
  } catch (error) {
    console.error('Error in saveProduct:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
};

// Promotions
export const getPromotions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'promotions'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error in getPromotions:', error);
    throw error;
  }
};

export const addPromotion = async (promotionData) => {
  try {
    const promotionRef = doc(collection(db, 'promotions'));
    await setDoc(promotionRef, {
      ...promotionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return promotionRef.id; // Return the new document ID
  } catch (error) {
    console.error('Error in addPromotion:', error);
    throw error;
  }
};

export const updatePromotion = async (id, promotionData) => {
  try {
    const promotionRef = doc(db, 'promotions', id);
    await setDoc(promotionRef, {
      ...promotionData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error in updatePromotion:', error);
    throw error;
  }
};

// Wrapper function for adding/updating promotions
export const savePromotion = async (promotionData) => {
  try {
    if (promotionData.id) {
      // If promotion has an ID, update it
      await updatePromotion(promotionData.id, promotionData);
      return promotionData.id;
    } else {
      // If no ID, add a new promotion
      const newId = await addPromotion(promotionData);
      return newId;
    }
  } catch (error) {
    console.error('Error in savePromotion:', error);
    throw error;
  }
};

export const deletePromotion = async (promotionId) => {
  try {
    const promotionRef = doc(db, 'promotions', promotionId);
    await deleteDoc(promotionRef);
  } catch (error) {
    console.error('Error in deletePromotion:', error);
    throw error;
  }
};