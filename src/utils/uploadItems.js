import { db } from './firebase';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import items from './items.json';

// ✅ Verifica si la colección 'items' ya tiene al menos un documento, si no, lo crea
async function ensureItemsCollectionExists() {
  const initDocRef = doc(collection(db, "items"), "init");

  try {
    const snapshot = await getDoc(initDocRef);
    if (!snapshot.exists()) {
      await setDoc(initDocRef, {
        initialized: true,
        createdAt: new Date().toISOString()
      });
      console.log("✅ Colección 'items' creada con documento 'init'.");
    } else {
      console.log("📦 Colección 'items' ya existía.");
    }
  } catch (error) {
    console.error("❌ Error al verificar/crear colección:", error);
    throw error; // detener si falla
  }
}

// ✅ Sube los ítems a Firestore
export async function uploadItems() {
  try {
    await ensureItemsCollectionExists(); // 👈 verificar y crear si es necesario

    const itemsCollection = collection(db, "items");

    for (let item of items) {
      try {
        const cleanItem = JSON.parse(JSON.stringify(item));

        // Asegurar que rating.count sea numérico
        if (
          cleanItem.rating &&
          typeof cleanItem.rating.count === "string"
        ) {
          cleanItem.rating.count = parseInt(cleanItem.rating.count, 10);
        }

        await setDoc(doc(itemsCollection, cleanItem.id.toString()), cleanItem);
        console.log(`✅ Item ${cleanItem.id} subido correctamente`);
      } catch (error) {
        console.error(`❌ Error al subir el item ${item.id}:`, error);
      }
    }
  } catch (mainError) {
    console.error("🛑 Fallo general en la carga de ítems:", mainError);
  }
}
