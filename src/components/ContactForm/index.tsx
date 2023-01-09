import React from "react";
import contactImg from "../../assets/images/contact-img.svg";
import GetInTouch from "./GetInTouch";

const ContactForm = () => {
  return (
    <section className="ContactForm" id="contact-form">
      <div className="bg-gradient-to-r from-welcome-text1 to-welcome-text2 w-full py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-32 md:flex-row">
            <img
              src={contactImg}
              alt="contact-img"
              className="animate-updown"
            />

            <GetInTouch />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
