import { createContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cantidadTotal, setCantidadTotal] = useState(0);

    return (
        <CartContext.Provider value={{ cantidadTotal, setCantidadTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Validación de props
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartContext;
