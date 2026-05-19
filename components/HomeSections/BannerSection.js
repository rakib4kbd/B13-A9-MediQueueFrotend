"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export default function App() {
  const sliderList = [
    {
      id: 1,
      title: "Learn From Expert Tutors",
      subtitle:
        "Book personalized online sessions with highly skilled tutors and improve your academic performance with flexible learning schedules.",
      imgSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      btns: [
        {
          label: "Find Tutors",
          style: "btn",
          navigation: "/tutors",
        },
      ],
    },

    {
      id: 2,
      title: "Flexible Online Learning",
      subtitle:
        "Choose your preferred subject, available time slot, and learning mode to enjoy a smooth and organized tutoring experience.",
      imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      btns: [
        {
          label: "Book a Session",
          style: "btn",
          navigation: "/tutors",
        },
      ],
    },

    {
      id: 3,
      title: "Track Your Learning Journey",
      subtitle:
        "Manage your booked sessions, monitor your progress, and stay connected with tutors through an easy-to-use dashboard.",
      imgSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      btns: [
        {
          label: "Get Started",
          style: "btn",
          navigation: "/register",
        },
      ],
    },
  ];

  return (
    <div className="py-5 px-2 md:px-0">
      <div className="relative">
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
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {sliderList.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full">
                <div className="card bg-base-100 image-full">
                  <figure className="aspect-2/1 relative">
                    <Image
                      src={slide.imgSrc}
                      alt={slide.title}
                      fill
                      sizes="md"
                      className="rounded-2xl"
                    />
                  </figure>

                  <div className="card-body grid md:px-20">
                    <div className="flex flex-col items-center md:items-start justify-around md:justify-center gap-3 min-h-100">
                      <div></div>
                      <div className="flex flex-col items-start gap-3">
                        <h2 className="card-title text-4xl">{slide.title}</h2>
                        <p className="text-lg">{slide.subtitle}</p>
                      </div>

                      <div className="card-actions flex justify-start">
                        {slide.btns.map((btn, idx) => (
                          <Link
                            href={btn.navigation}
                            className={btn.style}
                            key={idx}
                          >
                            {btn.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
