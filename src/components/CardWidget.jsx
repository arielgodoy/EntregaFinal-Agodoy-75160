import { Link } from "react-router-dom";

const CartWidget = () => {
  return (
    <div className="ms-3">
      <Link to="/carrito" className="nav-link text-white">
        <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
      </Link>
    </div>
  );
};

export default CartWidget;
