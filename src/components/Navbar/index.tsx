import React, { useEffect, useState } from "react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full h-24 fixed top-0 z-50 transition ${
        scrolled ? "bg-body-bg" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-between container mx-auto px-6 py-6 md:px-0 md:py-10">
        <a href="/" className="w-1/5">
          <h1 className="text-2xl md:text-5xl font-burtons font-bold">
            Pramodh
          </h1>
        </a>

        <a
          href="#contact-form"
          className="md:hidden bg-gradient-to-r from-web3-text1 to-web3-text2 hover:from-web3-text2 hover:to-web3-text1 text-white font-bold px-2 py-2 rounded-md text-sm"
        >
          Let's Connect
        </a>

        <div
          className="hidden w-full md:w-auto md:flex md:flex-row md:items-center md:gap-5"
          id="navbar-default"
        >
          <a
            href="https://www.linkedin.com/in/pramodh-kempapura-viswanath-b1227835/"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin size={32} color="#0077B5" />
          </a>
          <a
            href="https://www.github.com/pramodhkv"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub size={32} />
          </a>
          <a
            href="https://www.twitter.com/pramodh_kv"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillTwitterCircle size={32} color="#1DA1F2" />
          </a>

          <a
            href="#contact-form"
            className="bg-gradient-to-r from-web3-text1 to-web3-text2 hover:from-web3-text2 hover:to-web3-text1 text-white font-bold px-4 py-2 rounded-md"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
