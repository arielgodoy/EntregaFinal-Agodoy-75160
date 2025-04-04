import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        console.log("Categorías obtenidas:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <li className="dropdown-item text-muted">Cargando categorías...</li>
      ) : (
        categories.map((category, index) => (
          <li key={index}>
            <Link className="dropdown-item" to={`/productos/${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))
      )}
    </>
  );
}

export default Categories;
