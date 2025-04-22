import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();
const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);

  const agregarAlCarrito = (item, cantidad) => {
    const { id, description, image, price, stock } = item;
    const itemAgregado = { id, description, image, price, cantidad };

    const nuevoCarrito = [...carrito];
    const estaEnElCarrito = nuevoCarrito.find((producto) => producto.id === id);

    if (estaEnElCarrito) {
      const nuevaCantidad = estaEnElCarrito.cantidad + cantidad;
      if (nuevaCantidad <= stock) {
        estaEnElCarrito.cantidad = nuevaCantidad;
      } else {
        window.alert(`❌ No puedes agregar más de ${stock} unidades disponibles en stock.`);
        return;
      }
    } else {
      if (cantidad <= stock) {
        nuevoCarrito.push(itemAgregado);
      } else {
        window.alert(`❌ No puedes agregar más de ${stock} unidades disponibles en stock.`);
        return;
      }
    }

    setCarrito(nuevoCarrito);
    console.log("🛒 Carrito actualizado:", nuevoCarrito);
  };

  const cantidadEnCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  const precioTotal = () => {
    return carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cantidadEnCarrito,
        precioTotal,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
