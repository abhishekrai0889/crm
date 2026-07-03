import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;