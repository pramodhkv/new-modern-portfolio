import React from "react";
import "./App.scss";
import Banner from "./components/Banner";
import ContactForm from "./components/ContactForm";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AIChatBot from "./components/AIChatBot";

function App() {
  return (
    <div className="App min-h-screen relative font-normal overflow-x-hidden text-white bg-body-bg">
      <Navbar />
      <Banner />
      <Skills />
      <Projects />
      <ContactForm />
      <AIChatBot />
    </div>
  );
}

export default App;
