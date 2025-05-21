// components/ProductSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const ProductSlider = ({ products }) => {
  if (!products.length) return null;

  return (
    <div className="my-5">
      <h4 className="text-center text-success mb-3">New Arrivals</h4>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top"
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h6>{product.title}</h6>
                <p className="text-muted">${product.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(ProductSlider);
