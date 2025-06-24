import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="flex justify-center items-center text-center mb-12">
        <div className="flex flex-col gap-4 px-2 lg:px-0 w-full lg:max-w-3xl">
          <h3 className="text-3xl font-bold">Contactez nous ou <span className="text-blue-700">demandez de démo</span></h3>
          <p className="text-gray-500 font-normal text-sm">Notre équipe est à votre écoute pour répondre à toutes vos préoccupations, vous accompagner dans votre projet ou vous fournir plus d’informations sur nos solutions. N’hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start bg-white rounded-lg p-4">
        {/* Infos de contact */}
        <div className="bg-[#0A55C6] rounded-xl shadow p-8 w-full md:w-1/2 mb-8 md:mb-0">
          <h3 className="text-2xl font-semibold text-white mb-4">Informations de Contact</h3>
          <p className="text-gray-200">Remplissez le formulaire ci-contre et entrons en contact dès aujourd’hui.</p>
          <ul className="text-gray-100 space-y-4 mt-10">
            <li className="flex items-center gap-3 text-sm"><img src="/svg/TELEPHONE_2.svg" alt="telephone" className="w-5 h-5" />  +33745353669 / +22871092448</li>
            <li className="flex items-center gap-3 text-sm"><img src="/svg/LOCATION_2.svg" alt="location" className="w-5 h-5" /> Nous sommes à Lomé au Togo et nous travaillons à distance également.</li>
            <li className="flex items-center gap-3 text-sm"><img src="/svg/MAIL_2.svg" alt="mail" className="w-5 h-5" /> contact@dowonou.com</li>
          </ul>
          <div className="mb-2 font-semibold text-gray-100 mt-16">Réseaux sociaux</div>
          <div className="flex gap-3 text-2xl">
            <img src="/svg/RESEAUX_SOCIAUX_WHITE.svg" alt="reseaux sociaux" className="h-6" />
          </div>
        </div>

        {/* Formulaire de contact */}
        <form className="bg-white rounded-2xl p-2 lg:p-8 w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nom" className="font-semibold">Nom</label>
              <input type="text" placeholder="Nom" className="flex-1 border-b-2 border-gray-300 pr-4 py-2 focus:outline-none text-sm" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="prenom" className="text-gray-500 font-semibold">Prénom</label>
              <input type="text" placeholder="Prénom" className="flex-1 border-b-2 border-gray-300 pr-4 py-2 focus:outline-none text-sm" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-500 font-semibold">Adresse mail</label>
              <input type="email" placeholder="Adresse mail" className="flex-1 border-b-2 border-gray-300 pr-4 py-2 focus:outline-none text-sm" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="tel" className="text-gray-500 font-semibold">Numéro de téléphone</label>
              <input type="tel" placeholder="Numéro de téléphone" className="flex-1 border-b-2 border-gray-300 pr-4 py-2 focus:outline-none text-sm" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="message" className="text-gray-500 font-semibold">Message</label>
              <textarea placeholder="Message" className="flex-1 border-b-2 border-gray-300 pr-4 py-2 focus:outline-none text-sm" />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition self-end">Envoyer le message</button>
        </form>
      </div >
    </section >
  );
};

export default ContactSection; 