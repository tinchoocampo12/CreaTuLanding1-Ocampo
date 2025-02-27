import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";
import Hero from "./components/hero/hero.jsx";
import Footer from "./components/footer/footer.jsx";
import ItemListContainer from "./components/itemlistcontainer/itemlistcontainer.jsx";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Hero />*/}
      <ItemListContainer text="Sitio en construcción..." />
      <Footer />
    </div>
  );
}

export default App;
