import PropTypes from "prop-types";

const CustomButton = ({ onClick, children, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Definir tipos de props
CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired, // Callback para manejar clics
  children: PropTypes.node.isRequired, // Contenido dentro del botón
  className: PropTypes.string, // Clases CSS opcionales
};

// Valores por defecto
CustomButton.defaultProps = {
  className: "",
};

export default CustomButton;
