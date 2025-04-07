import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Categories from "./Getdata/Categories";
import logo from "../assets/pokeball.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // 🔥 Importa Bootstrap JS
import CartWidget from "./CardWidget";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            alt="El logo de mi Tienda Falsa"
            width="50"
            height="50"
            className="d-inline-block align-left"
          />
        </NavLink>

        {/* Botón de colapsar para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú principal */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Inicio */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            {/* Categorías (Dropdown) */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn"
                id="productoCategoriaDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categorías
              </button>
              <ul className="dropdown-menu" aria-labelledby="productoCategoriaDropdown">
                <Categories />
              </ul>
            </li>

            {/* Ofertas - Deshabilitado correctamente */}
            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                to="/Ofertas"
                onClick={(e) => e.preventDefault()} // Evita la navegación
              >
                Ofertas
              </NavLink>
            </li>

            {/* Avance de Temporada - Deshabilitado correctamente */}
            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                to="/Avance"
                onClick={(e) => e.preventDefault()} // Evita la navegación
              >
                Avance de Temporada
              </NavLink>
            </li>

            {/* Carrito */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/Carrito">
                🛒 {cartCount > 0 && <span className="badge bg-primary">{cartCount}</span>}
                <CartWidget/>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Validación de PropTypes
Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default Navbar;
