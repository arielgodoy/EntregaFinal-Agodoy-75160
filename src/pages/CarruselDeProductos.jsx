
import { useEffect, useState } from "react";
import CarouselProductos from "../components/CarouselProductos";

const Carrusel = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div>
      {/* Aquí va tu Navbar */}
      <CarouselProductos productos={productos} />
    </div>
  );
};

export default Carrusel;
