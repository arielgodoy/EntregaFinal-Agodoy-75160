import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log("🔥 firebaseConfig:", firebaseConfig); // <-- AQUI!

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Función para verificar la conexión a Firestore
export async function checkFirestoreConnection() {
  try {
    // Puedes cambiar 'items' por el nombre de cualquier colección existente
    const testCollection = collection(db, "items");
    await getDocs(testCollection);
    console.log("✅ Firestore conectado correctamente.");
    return true;
  } catch (error) {
    console.error("❌ Error de conexión a Firestore:", error);
    return false;
  }
}
// fimnciion crea dummy
export async function ensureItemsCollectionExists() {
  const initDocRef = doc(collection(db, "items"), "init");

  try {
    const snapshot = await getDoc(initDocRef);
    if (!snapshot.exists()) {
      await setDoc(initDocRef, { createdAt: new Date(), placeholder: true });
      console.log("✅ Colección 'items' creada con documento init.");
    } else {
      console.log("📦 Colección 'items' ya existía.");
    }
  } catch (error) {
    console.error("❌ Error al crear la colección 'items':", error);
  }
}



export { db };
