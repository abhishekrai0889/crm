import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";

function App() {
  const location = useLocation();

  const authPages = [
    "/signin",
    "/signup",
    "/forgot-password",
  ];

  const hideLayout = authPages.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;