import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OnlineOrder from "./pages/OnlineOrder";
import NavBar from "./components/NavBar"



function App() {
  return (
    <div>
      <NavBar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/Menu" element = {<Menu/>}/>
          <Route path="/OnlineOrder" element = {<OnlineOrder/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
