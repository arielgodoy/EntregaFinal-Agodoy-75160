import { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import CartContext from "../contexts/CartContext";

const Detallecarrito = () => {
  const [showModal, setShowModal] = useState(false);

  const { carrito, precioTotal, vaciarCarrito, cantidadEnCarrito } =
  useContext(CartContext);
  

  const handleOpenModal = () => {
    setShowModal(true);
  };



  const handleVaciaCarrito = () => {
    setShowModal(false); 
    vaciarCarrito({});    
    window.location.reload(); 
  };


  

  return (
    <>
      <section className="h-100 h-custom bg-light">
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col xs={12}>
              <Card
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <Card.Body className="p-0">
                  <Row className="g-0">
                    <Col lg={8}>
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Carrito de Compra
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {cantidadEnCarrito()} items
                          </h6>
                        </div>
                        <hr className="my-4" />

                        {/* Detalles de los productos en el carrito */}
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Producto</th>
                              <th scope="col">Descripción</th>
                              <th scope="col">Cantidad</th>
                              <th scope="col">Precio</th>
                              <th scope="col">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {carrito.map((producto) => (
                              <tr key={producto.id}>
                                <td>
                                  <a href={`/DetalleProducto/${producto.id}`}>
                                    <img
                                      src={producto.image}
                                      style={{ width: "50px" }}
                                      alt="Product"
                                    />
                                  </a>
                                </td>
                                <td>{producto.description}</td>
                                <td>{producto.cantidad}</td>
                                <td>US${producto.price}</td>
                                <td>US${producto.cantidad * producto.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <hr className="my-4" />
                      </div>
                    </Col>

                    <Col lg={4} className="bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Resumen</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            items {cantidadEnCarrito()}
                          </h5>
                          <h5>US${precioTotal()}</h5>
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Precio Total </h5>
                          <h5>US${precioTotal()}</h5>
                        </div>

                      

                        <Button
                          onClick={handleOpenModal}
                          type="button"
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                        >
                          Vaciar Carrito
                        </Button>                        
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Vaciar Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas vaciar tu carrito?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleVaciaCarrito}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Detallecarrito;
