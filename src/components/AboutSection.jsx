import React from "react";
import { useNavigate } from "react-router-dom";

const avantages = [
  "Solution tout-en-un",
  "Précision et fiabilité",
  "Gains de temps et d'efficacité",
  "Sécurité et Conformité",
  "Suivi et traçabilité des actions",
  "Interface intuitive",
  "Personnalisation selon vos besoins",
];

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-stretch gap-8 lg:gap-20">
        {/* Image à gauche */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 h-full">
          <div className="overflow-hidden w-full h-[200px] lg:h-[560px] flex items-center justify-end">
            <img src="/images/A_PROPOS.png" alt="about" className="w-full h-full bg-cover rounded-lg" />
          </div>
        </div>
        {/* Texte à droite */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            A propos: <span className="text-blue-500">Dowonou</span>
          </h2>
          <p className="text-gray-600 mb-4 text-justify lg:text-left">
            <span className="font-semibold">Dowonou</span> est un logiciel de gestion des employés conçu pour moderniser et simplifier la gestion des ressources humaines. Depuis sa création, notre mission est de fournir aux entreprises une solution technologique innovante qui répond à leurs besoins spécifiques en matière de gestion des employés.
          </p>
          <p className="text-gray-600 mb-10 lg:mb-4 text-justify lg:text-left">
            <span className="font-semibold">Dowonou</span> a été développée par une équipe d'experts en RH et en technologie, avec pour objectif de simplifier les processus complexes et d'améliorer l'efficacité des départements RH. Notre logiciel offre une interface conviviale et intuitive, accessible à tous, même sans connaissances techniques approfondies.
          </p>
          <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
            {avantages.map((a) => (
              <li key={a} className="flex items-center text-gray-800 font-semibold hitespace-nowrap"><img src="/svg/CIRCLE.svg" alt="•" className="w-4 h-4 mr-2" />{a}</li>
            ))}
          </ul>
          <button onClick={() => navigate("/contact")} className="w-[fit-content] bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition text-sm flex items-center gap-2">
            Contactez-nous
            <img src="/svg/ARROW_RIGHT.svg" alt="arrow_forward" className="w-4 h-4 pt-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 