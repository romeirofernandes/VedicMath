import { Link } from "react-router-dom";
import Features from "../components/Features";
import Header from "../components/Header";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="px-4 py-1.5 bg-[#2a2a35] rounded-full text-sm font-medium">
              Ancient Wisdom, Modern Approach
            </span>

            <h1 className="font-bricolage font-bold text-4xl md:text-5xl lg:text-6xl max-w-5xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
              Math with Vedic Techniques
            </h1>

            <p className="font-inter text-lg md:text-xl max-w-2xl text-[#e0c9b1]/80">
              Learn the ancient mathematical system that enables lightning-fast
              calculations, enhances mental agility, and provides a deeper
              understanding of numbers.
            </p>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Link to="/signin">
                <button className="px-8 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-inter font-bold hover:bg-[#d4b595] transition-colors duration-300">
                  Start Learning
                </button>
              </Link>

              <button
                className="px-8 py-3 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-inter font-medium hover:border-[#e0c9b1] transition-all duration-300"
                onClick={() => {
                  document
                    .getElementById("testimonials-section")
                    .scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                View Testimonials
              </button>
            </div>
          </div>
        </div>
      </section>

      <Features />

      <section id="testimonials-section" className="scroll-mt-13">
        <Testimonial />
      </section>

      <Footer />
    </div>
  );
}
