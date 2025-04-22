import { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form
} from "react-bootstrap";
import { db } from "../../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import CartContext from "../../contexts/CartContext";

const Detallecarrito = () => {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const { carrito, precioTotal, vaciarCarrito, cantidadEnCarrito } =
    useContext(CartContext);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleFinalizarCompra = async () => {
    try {
      const orden = {
        comprador: { nombre, email },
        items: carrito,
        total: precioTotal(),
        fecha: new Date()
      };

      const ordenRef = await addDoc(collection(db, "ordenes"), orden);

      for (const item of carrito) {
        const productoRef = doc(db, "items", item.id.toString());
        const productoSnap = await getDoc(productoRef);

        if (productoSnap.exists()) {
          const stockActual = productoSnap.data().stock; //actusalizamos el stock actual por si cambio mientras el usuario estaba viendo el carrito
          const nuevoStock = stockActual - item.cantidad; // restamos al stock actual la cantidad comprada

          if (nuevoStock >= 0) {
            await updateDoc(productoRef, { stock: nuevoStock });
          } else {
            alert(`❌ No hay stock suficiente para el producto: ${item.id}`);
            return;
          }
        }
      }

      alert(`✅ Compra realizada. ID de orden: ${ordenRef.id}`);
      vaciarCarrito();
      setShowModal(false);
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("❌ Ocurrió un error al procesar la compra.");
    }
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
                                      alt="Producto"
                                    />
                                  </a>
                                </td>
                                <td>{producto.description}</td>
                                <td>{producto.cantidad}</td>
                                <td>US${producto.price}</td>
                                <td>
                                  US${producto.cantidad * producto.price}
                                </td>
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
                        >
                          Finalizar Compra
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
          <Modal.Title>Finalizar Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleFinalizarCompra}
            disabled={!nombre || !email}
          >
            Confirmar Compra
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Detallecarrito;
