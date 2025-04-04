import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CustomButton from "../singles/CustomButton";

const LeeProducto = ({ producto }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/DetalleProducto/${producto.id}`);
    };

    return (
        <> 
        <div className="col-md-2 mb-2">
            <div className="card">
                <img src={producto.image} className="card-img-top img-fluid" alt={producto.title} />
                <div className="card-body">
                    <h5 className="card-title">{producto.title}</h5>
                    <p className="card-text">Precio: ${producto.price.toFixed(2)}</p>
                    <CustomButton onClick={handleClick} className="btn btn-info">
                    Ver Detalle
                    </CustomButton>   
                </div>
            </div>
        </div>       
        </>
    );
};

// 🔹 Validación de `prop-types`
LeeProducto.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default LeeProducto;
