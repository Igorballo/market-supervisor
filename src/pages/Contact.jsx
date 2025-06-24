import React from "react";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar_2 from "../components/Navbar_2";

const ContactPage = () => {
  return (
    <div className="bg-gray-100">
      <Navbar_2 />
      <div className="mt-12">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage; 