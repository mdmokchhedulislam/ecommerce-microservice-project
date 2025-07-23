import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SwipperData } from "../../api/Swipper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Container from "../common/Container";

const Banner = () => {
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 3000)}s`;
    }
  };

  return (
    <Container>

      <div className="pb-[30px]">
        <div className="w-full h-screen absolute top-0 left-0 right-0">

        </div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >



          {SwipperData && SwipperData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-5">
                {/* Image section */}
                <div className="md:w-1/2 w-full flex items-center md:justify-end">
                  <img className="rounded-2xl" src={item.image} alt="Banner" />
                </div>

                {/* Text content section */}
                <div className="md:w-1/2 w-full flex flex-col gap-[5px]">
                  <h1 className="text-[25px] sm:text-[40px] md:text-[30px] lg:text-[45px] lg:text-left  text-center font-bold font-gamamli">
                    {item.title}
                  </h1>
                  <p className="text-[18px] sm:text-[22px] md:text-[16px] lg:text-[28px] lg:text-left text-center font-onest font-semibold">{item.subtitle}</p>
                  <p className="pb-[30px] lg:pb-[15px] text-[12px] sm:text-[15px] md:text-[12px] lg:text-[16px] lg:text-left text-center pr-[30px]">
                    {item.description}
                  </p>
                  <button onClick={() => navigate("/books")} className="bg-slate-500 hover:bg-slate-700 px-4 py-2 lg:w-[150px] rounded-md text-white transition-all duration-500 hover:scale-105">Find Your Book</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Banner;
