import { useState } from "react";
import Navbar  from "./components/Navbar";
import Home    from "./components/Home";
import About   from "./components/About";
import Contact from "./components/Contact";
import Footer  from "./components/Footer";
import "./App.css";

export default function App() {
  const [active, setActive] = useState("Home");

  const navigate = (page) => {
    setActive(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (active) {
      case "Home":    return <Home    onNavigate={navigate} />;
      case "About":   return <About   />;
      case "Contact": return <Contact />;
      default:        return <Home    onNavigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navbar active={active} setActive={navigate} />
      <main className="app__main">
        {renderPage()}
      </main>
      <Footer setActive={navigate} />
    </div>
  );
}