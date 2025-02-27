import "./hero.css";
import hero from "../../assets/images/nc-hero.png";
import socioFull from "../../assets/images/nc-socio-full.png";
import socioEstandar from "../../assets/images/nc-socio-estandar.png";
import socioAtilio from "../../assets/images/nc-socio-atilio.png";
const Hero = () => {
  const cardsData = [
    {
      backgroundImage: `url(${socioFull})`,
      title: "Socio Full",
      price: "$1460 al mes",
      description: (
        <>
          <div className="flex flex-start align-center">
            <i class="bi bi-check"></i>
            <span>Acceso completo al contenido de Nacional Play</span>
          </div>
          <div className="flex align-center">
            <i class="bi bi-check"></i>
            <span>15% de descuento en la tienda</span>
          </div>
          <div className="flex align-center">
            {" "}
            <i class="bi bi-check"></i>
            <span>Compra anticipada de entradas</span>
          </div>
        </>
      ),
      button: "Hacete socio Full",
    },
    {
      backgroundImage: `url(${socioEstandar})`,
      title: "Socio Estándar",
      price: "$800 al mes",
      description: (
        <>
          <div className="flex flex-start align-center">
            <i class="bi bi-check"></i>
            <span>Acceso al contenido gratuito de Nacional Play</span>
          </div>
          <div className="flex align-center">
            <i class="bi bi-check"></i>
            <span>5% de descuento en la tienda</span>
          </div>
        </>
      ),
      button: "Hacete socio Estándar",
    },
    {
      backgroundImage: `url(${socioAtilio})`,
      title: "Socio Atilio",
      price: "$400 al mes",
      description: (
        <>
          <div className="flex flex-start align-center">
            <i class="bi bi-check"></i>
            <span>Pack de bienvenida y carnet físico</span>
          </div>
          <div className="flex align-center">
            <i class="bi bi-check"></i>
            <span>Compra anticipada de entradas</span>
          </div>
          <div className="flex align-center">
            {" "}
            <i class="bi bi-check"></i>
            <span>Un regalo sorpresa cada año</span>
          </div>
        </>
      ),
      button: "Hacete socio Atilio",
    },
  ];
  return (
    <>
      <section
        className="nc-hero flex align-center justify-center"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "950px",
        }}
      >
        <div className="nc-intro flex align-center justify-center flex-column hero-intro absolute">
          <h1 className="title-size">El sitio oficial del hincha</h1>
          <p>
            Nacionalizate y accedé a descuentos exclusivos en nuestra tienda,
            promociones y mucho más.
          </p>
          <div className="nc-card flex">
            {cardsData.map((card, index) => (
              <div key={index} className="card flex flex-column">
                <div
                  className="image"
                  style={{
                    backgroundImage: card.backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="card-desc flex flex-column">
                  <h1>{card.title}</h1>
                  <h3>{card.price}</h3>
                  <button className="card-btn">{card.button}</button>
                  <span>{card.description}</span>
                </div>
              </div>
            ))}
          </div>
          <a href="#">Ver todos los detalles</a>
        </div>
      </section>
    </>
  );
};

export default Hero;
