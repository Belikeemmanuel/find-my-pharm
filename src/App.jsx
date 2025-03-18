import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import PharmacyListPage from "./pages/PharmacyListPage/PharmacyListPage.jsx";
import PharmacyDetailsPage from "./pages/PharmacyDetailsPage/PharmacyDetailsPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pharmacies" element={<PharmacyListPage />} />
          <Route
            path="/pharmacies/:pharmId"
            element={<PharmacyDetailsPage />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
