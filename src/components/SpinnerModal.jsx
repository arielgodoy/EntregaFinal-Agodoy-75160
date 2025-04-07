import { Modal} from "react-bootstrap";
import logo from "./logo.png";
import './SpinnerModal.css'

function SpinnerModal() {
  return (
    <div>
      <Modal show={true} centered >
        <Modal.Body>          
          <div className="logo-container">
          <img src={logo} alt="Logo flipping" className="flipping-logo"/>
          <br/>
          <p className="loading-text">Cargando datos</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SpinnerModal;
