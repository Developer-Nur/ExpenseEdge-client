import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from 'swiper/modules';;

const Partner = () => {
  const partners = [
    { id: 1, name: "impact", logo: "https://images.prismic.io/paddle/ZnB4hZm069VX10Rv_logo-laravel.webp" },
    { id: 2, name: "kronos", logo: "https://images.prismic.io/paddle/ZnB4Ypm069VX10Rs_logo-fortinet.webp" },
    { id: 3, name: "sharmans", logo: "https://images.prismic.io/paddle/ZnB4qpm069VX10Rz_logo-adaptavist.webp" },
    { id: 4, name: "sharmans", logo: "https://images.prismic.io/paddle/ZnB4zpm069VX10R8_logo-n8n.webp" },
    { id: 5, name: "moonrise", logo: "https://images.prismic.io/paddle/ZnB49Jm069VX10SC_logo-beyond-code.webp" },
    { id: 6, name: "econochill", logo: "https://images.prismic.io/paddle/ZnB4dpm069VX10Ru_logo-macpaw.webp" },
    { id: 7, name: "incept3d", logo: "https://images.prismic.io/paddle/ZnB4dpm069VX10Ru_logo-macpaw.webp" },
    { id: 8, name: "niveus", logo: "https://images.prismic.io/paddle/ZnB49Jm069VX10SC_logo-beyond-code.webp" },
    { id: 9, name: "inbe", logo: "https://images.prismic.io/paddle/ZnB4hZm069VX10Rv_logo-laravel.webp" },
    { id: 10, name: "purpleslate", logo: "https://images.prismic.io/paddle/ZnB4dpm069VX10Ru_logo-macpaw.webp" },
    
  ];

  return (
    <section className="bg-black py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Trusted by <span className="text-yellow-400">businesses</span> and{" "}
          <span className="text-yellow-400">CAs</span> worldwide
        </h2>
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 500 }}
          modules={[Autoplay]}
          speed={2500}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Partner;
