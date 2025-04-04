import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import LeeProducto from "./Getdata/LeeProducto"; // Tu componente de productos

const CarouselProductos = ({ productos }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Productos Destacados</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4} // Puedes ajustar la cantidad de productos visibles
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {productos.map((producto) => (
          <SwiperSlide key={producto.id}>
            <LeeProducto producto={producto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// 🔹 Validación de `prop-types`
CarouselProductos.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CarouselProductos;
