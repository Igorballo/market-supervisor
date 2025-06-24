import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

const modules = [
  {
    name: "DOWONOU RH",
    to: "/dowonou",
    logo: "/svg/DOWONOU_RH.svg",
    description: "Gestion des ressources humaines"
  },
  {
    name: "DOWONOU CRM",
    to: "/crm-log",
    logo: "/svg/DOWONOU_CRM.svg",
    description: "Optimiser la gestion de la relation client"
  },
  { name: "DOWONOU GED", to: "/agbale" ,
    logo: "/svg/DOWONOU_GED.png",
    description: "Gestion électronique des documents"
  },
  { name: "DOWONOU STOCK", to: "/erp-log",
    logo: "/svg/DOWONOU_STOCK.svg",
    description: "Gestion des stocks"
   },
  { name: "DOWONOU PAIE", to: "/paie-log",
    logo: "/svg/DOWONOU_PAIE.svg",
    description: "Gestion automatique de la paie"
   },
];

const Navbar_2 = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isSolutionsActive = modules.some(module => location.pathname === module.to);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#solutions-dropdown")) setDropdown(false);
    };
    if (dropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  return (
    <nav className="bg-white shadow text-gray-800 fixed w-full top-0 left-0 transition-all duration-300" style={{ zIndex: 1000 }}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="140" height="35" viewBox="0 0 205 44.308">
            <g id="Groupe_5601" data-name="Groupe 5601" transform="translate(-190 -54)">
              <text
                id="Dowonou"
                transform="translate(246 87.308)"
                fontSize="31"
                fontFamily="Poppins-SemiBold, Poppins"
                fontWeight="600"
                className="text-gray-800"
                fill="currentColor"
              >
                <tspan x="0" y="0">Dowonou</tspan>
              </text>
              <g id="Groupe_5600" data-name="Groupe 5600" transform="translate(3 3.313)">
                <rect id="Rectangle_1" data-name="Rectangle 1" width="44" height="44" rx="8.64" transform="translate(187 50.688)" fill="#0a55c6" />
                <path id="Rectangle_3366" data-name="Rectangle 3366" d="M0,0H1A24,24,0,0,1,25,24v1a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(196 60.688)" fill="#fff" />
              </g>
            </g>
          </svg>


        </div>
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium text-sm text-gray-700 hover:text-blue-500 ${isActive ? 'border-b-[3px] border-blue-400 pb-0.5' : ''}`
            }
          >
            Accueil
          </NavLink>
          {/* Dropdown Solutions */}
          <div className="relative" id="solutions-dropdown">
            <button
              onClick={() => setDropdown((d) => !d)}
              className={`flex items-center gap-1 text-gray-700 hover:text-blue-500 font-medium text-sm focus:outline-none ${isSolutionsActive ? 'border-b-[3px] border-blue-400 pb-0.5' : ''}`}
            >
              Solutions
              <svg className={`w-4 h-4 transition-transform ${dropdown ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdown && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[620px] bg-white shadow-lg rounded-lg py-8 px-2 z-50 border">
                <div className="px-6 pb-2">
                  <div className="font-medium text-gray-500 text-base mb-2">Nos solutions</div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {modules.map((mod, idx) => (
                    <Link
                      key={mod.name}
                      to={mod.to}
                      className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
                      onClick={() => setDropdown(false)}
                    >
                      {mod.logo ? (
                        <img src={mod.logo} alt={mod.name} className="h-8 w-8 object-contain" />
                      ) : (
                        <span className="h-8 w-8 flex items-center justify-center rounded bg-gray-100">{mod.name[0]}</span>
                      )}
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-gray-900">{mod.name}</span>
                        {mod.description && (
                          <span className="text-xs text-gray-500">{mod.description}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => 
              `text-gray-700 hover:text-blue-500 font-medium text-sm ${isActive ? 'border-b-[3px] border-blue-400 pb-0.5' : ''}`
            }>À propos</NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
              `text-gray-700 hover:text-blue-500 font-medium text-sm ${isActive ? 'border-b-[3px] border-blue-400 pb-0.5' : ''}`
            }>Contact</NavLink>
        </div>
        {/* Bouton Se connecter */}
        <div className="hidden md:block">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition text-sm">Se connecter</Link>
        </div>
        {/* Hamburger */}
        <button className="md:hidden flex items-center justify-center w-8 h-8 flex-shrink-0 ml-2" onClick={() => setOpen(!open)}>
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow px-4 pb-4 py-8">
          <a href="#accueil" className="block py-2 text-gray-700 hover:text-blue-500 font-medium">Accueil</a>
          {/* Dropdown Solutions pour mobile */}
          <div className="block py-2">
            <button
              onClick={() => setDropdown((d) => !d)}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-500 font-medium text-sm focus:outline-none"
            >
              Solutions
              <svg className={`w-4 h-4 transition-transform ${dropdown ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdown && (
              <div className="mt-2 w-full bg-white shadow-lg rounded-lg py-6 border">
                {modules.map((mod, idx) => (
                  <Link
                    key={mod.name}
                    to={mod.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm transition"
                    onClick={() => setDropdown(false)}
                  >
                    {mod.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-500 font-medium">À propos</Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-500 font-medium">Contact</Link>
          <Link to="/login" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition text-sm flex items-center justify-center">Se connecter</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar_2; 