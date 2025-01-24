import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQv93Z2JzutQd46wMOwrKCComo6Xccxgc",
  authDomain: "mi-ecommerce-jp.firebaseapp.com",
  projectId: "mi-ecommerce-jp",
  storageBucket: "mi-ecommerce-jp.firebasestorage.app",
  messagingSenderId: "594343984491",
  appId: "1:594343984491:web:2536383f0e9fdec948602e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getCategories = async () => {
  const productsCollection = collection(db, "products");
  const snapshot = await getDocs(productsCollection);
  const categoriesSet = new Set();

  snapshot.docs.forEach(doc => {
    categoriesSet.add(doc.data().category);
  });

  return [...categoriesSet];
};

export const getProducts = async () => {
  const productsCollection = collection(db, "products");
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductsByCategory = async (category) => {
  const productsCollection = collection(db, "products");
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs
    .filter(doc => doc.data().category === category)
    .map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Producto no encontrado");
  }
};

export const createOrder = async (orderData) => {
  const ordersCollection = collection(db, "orders");
  const order = await addDoc(ordersCollection, {
    ...orderData,
    date: Timestamp.fromDate(new Date()),
    status: 'generada',
  });

  return order.id;
};

export { db };
