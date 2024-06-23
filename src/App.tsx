import Highlights from "./components/Highlights";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Model from "./components/Model";

function App() {
  return (
    <main className="bg-black ">
      <NavBar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
}

export default App;
