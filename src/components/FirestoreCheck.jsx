import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase"; // ajusta si tu archivo está en otra ruta

const FirestoreCheck = () => {
  const [estado, setEstado] = useState("esperando");

  const verificarConexion = async () => {
    setEstado("verificando");
    try {
      const snapshot = await getDocs(collection(db, "items"));
      if (!snapshot.empty || snapshot.docs.length >= 0) {
        setEstado("conectado");
      } else {
        setEstado("vacio");
      }
    } catch (error) {
      console.error("❌ Error de conexión a Firestore:", error);
      setEstado("error");
    }
  };

  const renderEstado = () => {
    switch (estado) {
      case "verificando":
        return "🔄 Verificando conexión...";
      case "conectado":
        return "✅ Conexión exitosa a Firestore";
      case "vacio":
        return "📦 Colección vacía pero accesible";
      case "error":
        return "❌ Error al conectar con Firestore";
      default:
        return "Haz clic para verificar conexión";
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", marginTop: "1rem" }}>
      <h3>Test de conexión Firestore</h3>
      <button onClick={verificarConexion}>Verificar conexión</button>
      <p>{renderEstado()}</p>
    </div>
  );
};

export default FirestoreCheck;
