import Highlights from "./components/Highlights";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Model from "./components/Model";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="bg-black ">
      <NavBar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}

export default App;
