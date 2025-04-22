import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Carrusel from "./pages/CarruselDeProductos";
import Productos from "./components/Getdata/ItemList";
import DetalleProducto from "./components/Getdata/ItemDetail";
import { CartProvider } from "./contexts/CartContext";
import Detallecarrito from "./components/Getdata/CheckoutForm";
import ItemListContainer from "./components/Getdata/ItemListContainer";



function App() {
  const [cartCount, setCartCount] = useState(0); 
  return (
    <CartProvider>
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>        
        <Route path="/" element={<ItemListContainer mensaje="¡Bienvenido a nuestra tienda!" setCartCount={setCartCount} />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/about" element={<About />} />        
        <Route path="/carrusel" element={<Carrusel />} />        
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:categoria" element={<Productos />} /> 
        <Route path="/DetalleProducto/:productid" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Detallecarrito />} /> 
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
