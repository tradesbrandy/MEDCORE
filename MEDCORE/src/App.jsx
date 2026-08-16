import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Admin from "./components/Admin.jsx";
import { MedicationsProvider } from "./MedicationsContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <MedicationsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MedicationsProvider>
    </BrowserRouter>
  );
}

export default App;