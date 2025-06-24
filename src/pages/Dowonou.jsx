import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";

const RhPage = () => {
    const features = [
        "Gestion des employés (profil, documents, historique, poste)",
        "Gestion des congés et absences",
        "Suivi des documents administratifs",
        "Suivi des objectifs & évaluation de performance",
        "Recrutement et intégration",
        "Communication interne et notifications",
        "Tableaux de bord et statistiques RH",
    ];

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />
            {/* Bannière avec image de fond */}
            <div className="w-full pt-16 pb-10 relative h-72" style={{ backgroundImage: 'url(/images/RH-BACKGROUND.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>

            <div className="-mt-44 lg:max-w-6xl mx-auto flex flex-col items-center lg:flex-row lg:items-center lg:justify-between px-4 relative z-10">
                <div className="text-white md:w-1/2 w-full">
                    <div className="flex flex-col">
                        <Link to="/" className="flex items-center text-sm mb-4 hover:underline text-blue-100">
                            <span className="mr-2 text-lg">&larr;</span> Page d'accueil
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Dowonou RH</h1>
                        <p className="text-base font- mb-4">Une solution complète pour piloter efficacement les ressources humaines de votre entreprise.</p>
                    </div>
                    <div className="py-12 flex-1 ">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Présentation Générale</h2>
                        <p className="text-gray-700 text-base leading-relaxed text-justify">
                            <span className="font-medium text-base text-gray00">DOWONOU RH</span> est une solution RH tout-en-un conçue pour digitaliser et simplifier la gestion du capital humain. Du recrutement à la gestion de carrière, en passant par les congés, documents et évaluations, tout est pensé pour optimiser vos processus internes.
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2 lg:translate-x-8">
                    <img src="/images/USER-PROFILE.png" alt="Dowonou RH Mockup" className="w-full" />
                </div>
            </div>

            <div className="flex flex-col justify-center pb-20 pt-20 lg:pt-28">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 h-full bg-transparent px-4">
                    <div className="md:w-1/2 w-full h-full flex justify-center">
                        <div className="relative w-full h-full">
                            <img src="/images/KEY-FEATURES.png" alt="Fonctionnalités RH" className="rounded-lg w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col justify-center">
                        <h2 className="text-2xl md:text-2xl font-bold text-gray-800 mb-6">Fonctionnalités clés</h2>
                        <ul className="space-y-4">
                            {features.map((f, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-base md:text-lg">
                                    <span className="mt-1 w-3 h-3 rounded-sm bg-blue-600 inline-block"></span>
                                    <span className="text-sm">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <ContactSection />


            <Footer />
        </div>
    );
};

export default RhPage; 