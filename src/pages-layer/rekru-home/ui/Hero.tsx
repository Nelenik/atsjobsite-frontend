'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';



type TProps = {

}
export const Hero = ({ }: TProps) => {
  return (
    <section
      className='min-h-[495px] overflow-hidden'
    >
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}

      >
        <SwiperSlide className=''>
          <div className="rekru-container">
            Slide1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rekru-container">
            Slide2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rekru-container">
            Slide3
          </div>
        </SwiperSlide>

        <button className="hero-prev absolute z-10 left-5 top-1/2"><ChevronLeft size={40} strokeWidth={1} /></button>
        <button className="hero-next absolute z-10 right-5 top-1/2"><ChevronRight size={40} strokeWidth={1} /></button>
      </Swiper>
    </section>
  );
}