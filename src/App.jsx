import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import Trial from "./pages/Trial"; 
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import BasicTable from "../src/ui/Example/BasicTable"
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Trial />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/table" element={<BasicTable />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;