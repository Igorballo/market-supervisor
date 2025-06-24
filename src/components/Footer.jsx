import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-10 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto">
      <div className="px- flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Logo et description */}
        <div className="flex-1 mb-8 md:mb-0 w-full">
          <div className="flex items-start justify-start gap-2 mb-3 w-full">
            <img src="/svg/DOWONOU_FOOTER.svg" alt="logo" className="h-10" />
          </div>
          <p className="text-gray-500 text-justify lg:text-left mb-4">Une solution complète et intuitive qui centralise toutes les fonctions RH en un seul endroit. Partenaire pour la gestion des entreprises.</p>
          <div className="flex gap-3 text-2xl">
            <img src="/svg/RESEAUX_SOCIAUX.svg" alt="facebook" className="h-6" />
          </div>
        </div>
        {/* Menu rapide */}
        <div className="flex-1 mb-8 md:mb-0">
          <h4 className="font-bold text-gray-700 mb-2">Menu rapide</h4>
          <ul className="text-gray-500 space-y-3">
            <li>Accueil</li>
            <li>Modules</li>
            <li>À propos</li>
            <li>Contact</li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1">
          <h4 className="font-bold text-gray-700 mb-4">Contact</h4>
          <ul className="text-gray-500 space-y-4">
            <li className="flex items-center gap-3 text-sm"><img src="/svg/TELEPHONE.svg" alt="telephone"  className="w-5 h-5"/>  +33745353669 / +22871092448</li>
            <li className="flex items-center gap-3 text-sm"><img src="/svg/LOCATION.svg" alt="location"  className="w-5 h-5"/> Nous sommes à Lomé au Togo et nous travaillons à distance également.</li>
            <li className="flex items-center gap-3 text-sm"><img src="/svg/MAIL.svg" alt="mail"  className="w-5 h-5"/> contact@dowonou.com</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-1 md:gap-0 md:flex-row w-full  items-center justify-between font-semibold border-t-2 border-gray-200 border-dashed text-gray-800 text-sm pt-5 mt-8">
        <p>Copyright 2025 All Rights Reserved Dowonou </p> <a href="https://afcorporations.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">By AF Corporations</a>
      </div>
      </div>
    </footer>
  );
};

export default Footer; 