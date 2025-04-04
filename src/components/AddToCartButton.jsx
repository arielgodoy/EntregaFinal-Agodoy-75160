import { useContext } from "react";
import CartContext from "../contexts/CartContext";

const AddToCartButton = () => {
  const { cantidadTotal, setCantidadTotal } = useContext(CartContext);

  const aumentarCantidadTotal = () => {    
    setCantidadTotal(cantidadTotal + 1);
  };

  return (
    <button className="btn btn-primary" onClick={aumentarCantidadTotal}>
      Añadir al carrito ({cantidadTotal})
    </button>
  );
};

export default AddToCartButton;

