import React from "react";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import Navbar_2 from "../components/Navbar_2";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <Navbar_2 />
      <div className="mt-12">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 