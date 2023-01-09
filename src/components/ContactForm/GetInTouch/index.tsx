import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface IStatus {
  type: "success" | "error";
  message: string;
}

const GetInTouch = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState<IStatus | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText("Sending...");

    emailjs
      .sendForm(
        "service_mfpc847",
        "template_z344n6q",
        formRef.current as HTMLFormElement,
        "UWyEpDGlpzkvpou3o"
      )
      .then(
        () => {
          setButtonText("Send");
          setStatus({ type: "success", message: "Message has been sent!" });
          formRef.current?.reset();

          setTimeout(() => {
            setStatus(null);
          }, 5000);
        },
        (error: any) => {
          console.error(error.text);
          setButtonText("Send");
          setStatus({
            type: "error",
            message: "Oops! Something went wrong. Please try again.",
          });
          formRef.current?.reset();

          setTimeout(() => {
            setStatus(null);
          }, 5000);
        }
      );
  };

  return (
    <div className="FormSection w-full">
      <h1 className="text-2xl md:text-5xl font-centra font-bold">
        Get In Touch
      </h1>

      <form onSubmit={sendEmail} className="mt-5" ref={formRef}>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            name="from_name"
            placeholder="Name"
            className="form-input bg-transparent rounded-3xl border border-solid border-slate-400 text-white placeholder:text-white py-4 px-6 text-lg transition ease-in-out duration-300 focus:bg-slate-100 focus:text-gray-700 focus:placeholder:text-gray-700"
          />
          <input
            type="email"
            name="email_address"
            placeholder="Email"
            className="form-input bg-transparent rounded-3xl border border-solid border-slate-400 text-white placeholder:text-white py-4 px-6 text-lg transition ease-in-out duration-300 focus:bg-slate-100 focus:text-gray-700 focus:placeholder:text-gray-700"
          />
          <textarea
            name="message"
            id=""
            cols={30}
            rows={10}
            placeholder="Message"
            className="form-textarea bg-transparent rounded-3xl border border-solid border-slate-400 text-white placeholder:text-white py-4 px-6 text-lg transition ease-in-out duration-300 focus:bg-slate-100 focus:text-gray-700 focus:placeholder:text-gray-700"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-web3-text1 to-web3-text2 hover:from-web3-text2 hover:to-web3-text1 text-white font-bold px-4 py-5 rounded-xl "
          >
            {buttonText}
          </button>

          {status?.message && <p>{status.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
