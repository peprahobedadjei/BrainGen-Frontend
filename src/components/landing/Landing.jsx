import ButtonGradient from "../../assets/svg/ButtonGradient";
import Benefits from "../Benefits";
import Footer from "../Footer";
import Header from "../Header";
import Hero from "../Hero";
import Services from "../Services";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Services />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
