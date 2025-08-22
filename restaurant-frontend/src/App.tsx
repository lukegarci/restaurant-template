import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OnlineOrder from "./pages/OnlineOrder";
import Catering from "./pages/Catering";
import Header from "./components/Header"
import Footer from "./components/Footer";
import './css/App.css'




function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/OnlineOrder" element={<OnlineOrder />} />
          <Route path="/Catering" element={<Catering />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
