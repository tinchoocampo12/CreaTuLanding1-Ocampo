import "./Hero.css";
import hero from "../../assets/images/nc-hero2-hd.png";
const Hero = () => {
  return (
    <>
      <section
        className="nc-hero flex align-center justify-center"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="hero-intro">
          <h1 className="title-hero">
            Bienvenido a la tienda oficial del hincha.
          </h1>
          <p>Hacete socio y accedé a descuentos exclusivos.</p>
        </div>
      </section>
    </>
  );
};

export default Hero;
