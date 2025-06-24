import React from "react";

const steps = [
  {
    icon: "/svg/RECUEIL.svg",
    title: "Recueil de besoin",
  },
  {
    icon: "/svg/CUSTOMISATION.svg",
    title: "Customisation",
  },
  {
    icon: "/svg/DEPLOIEMENT.svg",
    title: "Déploiement",
  },
  {
    icon: "/svg/FORMATION.svg",
    title: "Formation & maintenance",
  },
];

const ProcessSection = () => {
  return (
    <section className="relative text-white py-16 bg-cover bg-center w-full" style={{ backgroundImage: "url('/images/PROCESSUS_MOCKUP.png')" }}>
      <div className="absolute inset-0 z-0" />
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-3xl font-bold text-center mb-3 uppercase tracking-wide">Le processus Dowonou</h2>
        <p className="text-center text-gray-200 mb-10 max-w-4xl mx-auto">
        Chez Dowonou, notre approche repose sur quatre étapes clés : recueil de besoins, customisation, déploiement et formation avec maintenance, pour vous offrir une solution parfaitement adaptée et opérationnelle.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="flex flex-row flex-wrap lg:flex-nowrap items-center w-full">
            {steps.map((step, idx) => (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center text-center flex-1">
                  <img src={step.icon} alt={step.title} className="w-16 h-16 mb-6" />
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block h-0.5 w-12 md:w-24 pt-12 border-t-2 border-dashed border-white mx-2 self-center"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection; 