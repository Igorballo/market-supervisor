import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import LandingModules from "./pages/LandingModules";
import Dowonou from "./pages/Dowonou";
import Ged from "./pages/Agbale";
import Erp from "./pages/Erp";
import Paie from "./pages/Paie";
import Crm from "./pages/Crm";
import ResetPassword from "./pages/ResetPassword";
import VerifyCode from "./pages/VerifyCode";
import NewPassword from "./pages/NewPassword";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/modules" element={<LandingModules />} />
      <Route path="/dowonou" element={<Dowonou />} />
      <Route path="/agbale" element={<Ged />} />
      <Route path="/erp-log" element={<Erp />} />
      <Route path="/paie-log" element={<Paie />} />
      <Route path="/crm-log" element={<Crm />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </Router>
);

export default AppRouter; 