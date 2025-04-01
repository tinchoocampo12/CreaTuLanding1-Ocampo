import React from "react";
import Hero from "../Hero/Hero.jsx";
import Navbar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
const Home = ({ products }) => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default Home;
