import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
<<<<<<< HEAD
import SignIn from "./pages/SignIn";
=======
import Login from "./pages/Login";
>>>>>>> c9292e961e73684643df23f572a2337151b32d0f

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
<<<<<<< HEAD
        <Route path="/signin" element={<SignIn />} />
=======
        <Route path="/login" element={<Login />} />
>>>>>>> c9292e961e73684643df23f572a2337151b32d0f
      </Routes>

      <Footer />
    </>
  );
}

export default App;
