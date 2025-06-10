import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>


      {/* Swiper Carousel */}
      <div className="relative w-full h-[80vh]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          <SwiperSlide>
            <img src="/images/END-gbv-1.jpg" alt="Slide 1" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/2.jpg" alt="Slide 2" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/4.jpg" alt="Slide 3" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/6.jpg" alt="Slide 3" className="w-full h-full object-cover" />
          </SwiperSlide>
        </Swiper>

        {/* Hero Content */}
        <section className="absolute inset-0 bg-grey bg-opacity-40 flex flex-col items-center justify-center text-center px-4 py-10 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Speak Up. Stay Safe.
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            We provide a secure platform for reporting gender-based violence and accessing support—confidentially and safely.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="/report"
              className="bg-[#4C334C] border-purple-900 text-white px-6 py-3 rounded-lg hover:bg-purple-400"
            >
              Report GBV
            </a>
            <a
              href="/resources"
              className=" bg-[#4C334C] border border-purple-900 text-white px-6 py-3 rounded-lg hover:bg-purple-400"
            >
              Find Support
            </a>
          </div>
        </section>
      </div>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-200 via-purple-100 to-white">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-xl text-center">
          <div className="flex justify-center mb-6">
            <svg
              className="w-16 h-16 text-purple-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2 2 5 2 5 2-3.895 2-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14h.01" />
            </svg>
          </div>

          <h2 className="text-4xl font-extrabold text-black mb-6">
            Our Mission
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            To provide a <span className="font-semibold text-purple-600">safe, accessible, and confidential</span> platform for survivors and witnesses of Gender-Based Violence to report incidents, access support services, and find empowerment through justice and healing. We are committed to <span className="italic text-purple-500">promoting awareness</span>, protecting human dignity, and standing up for every voice affected by GBV.
          </p>
        <Link to="/learn">
            <button className="mt-8 bg-[#4C334C] hover:bg-purple-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition">
            Learn More
          </button>
        </Link>  
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto text-center text-white mb-10">
          <h2 className="text-3xl text-black font-bold mb-4">How It Works</h2>
          <p className="text-lg text-black">
            Learn how to use our platform in 3 simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          {[1, 2, 3].map((step, index) => (
            <div key={index} className="flip-card bg-transparent h-64 relative">
              <div className="flip-inner w-full h-full">
                {/* Front */}
                <div className="flip-front bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center h-full">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Step {step}
                  </h3>
                  <p className="text-gray-600">
                    {step === 1
                      ? "Click 'Report GBV' to access a confidential form."
                      : step === 2
                        ? "Submit details anonymously or with contact info if you prefer follow-up."
                        : "Get immediate support or connect with verified partners."}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="flip-back text-white p-6 rounded-lg shadow flex flex-col justify-center items-center h-full"
                  style={{ backgroundColor: "#B67AB5" }}
                >
                  <h3 className="text-xl font-semibold mb-2">You're Not Alone</h3>
                  <p>We’re here to support you every step of the way.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      </div>
  );
}
