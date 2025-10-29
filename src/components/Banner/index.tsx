import React from "react";
import headerImg from "../../assets/images/header-img.svg";

const Banner = () => {
  return (
    <div className="Banner w-full bg-banner bg-no-repeat bg-cover mt-0 py-28 px-6 md:px-0 md:py-64">
      <div className="container mx-auto flex flex-col items-start md:items-center md:flex-row ">
        <div className="flex flex-col gap-5 md:w-2/3">
          {/* <span className=" text-white w-fit mb-2 md:text-xl z-[1] relative px-2 inline-block after:content after:absolute after:min-w-full after:h-1/5 after:bottom-0 after:left-0 after:bg-gradient-to-l after:from-[#7928ca] after:to-[#ff0080] after:-z-[1] after:transform after:-rotate-1">
            Looking for new opportunities
          </span> */}

          <h1 className="mb-2 text-2xl font-mono md:text-6xl w-max text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Hi!, I&apos;m Pramodh{" "}
            <span className="text-2xl md:text-5xl text-yellow-100 animate-wave inline-block">
              👋🏽
            </span>
          </h1>

          <p className="text-gray-400 md:w-2/3 md:text-lg">
            I&apos;m a Senior Frontend Engineer based in Munich, Germany.
            I&apos;m passionate about building aesthetic WebApps and I&apos;m
            currently working with{" "}
            <a
              href="https://www.wongdoody.com/"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              Wongdoody GmbH
            </a>
            . Hit me up if you have relevant opportunities.
          </p>
        </div>

        <div className="Banner_image-section mt-8 md:mt-0">
          <img src={headerImg} alt="space-boy" className="animate-updown" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
