import { Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
