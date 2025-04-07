import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import LeeProducto from "./LeeProducto";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoria } = useParams();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        let itemsRef = collection(db, "items");

        // Si hay categoría, armamos una consulta filtrada
        let q = categoria
          ? query(itemsRef, where("category", "==", categoria))
          : itemsRef;

        const snapshot = await getDocs(q);

        const productosFirestore = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirestore);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al obtener los productos desde Firestore");
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "5rem", height: "5rem", borderWidth: "5px" }}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) return <h2 className="text-danger">{error}</h2>;

  return (
    <div className="container mt-4">
      <h2>
        Productos {categoria ? `de la categoría: ${categoria}` : ""}
      </h2>
      <div className="row">
        {productos.map((prod) => (
          <LeeProducto producto={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
