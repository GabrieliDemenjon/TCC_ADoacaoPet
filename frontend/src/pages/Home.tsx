import React from "react";
import Logo from "../assets/logo.png";

export default function Home() {
  return (
    <div
      className="
        h-screen
        overflow-hidden
        pt-10 md:pt-16
        px-6 
        bg-gradient-to-br 
        from-rose-50 via-pink-50 to-rose-100
        relative 
      "
    >


      <div
        className="
          absolute inset-0 
          bg-rose-100
          bg-[url('/pawsoft.png')] 
          bg-no-repeat bg-cover
          opacity-70
          pointer-events-none
        "
      ></div>


      <main
        className="
          relative z-10 
          max-w-6xl mx-auto 
          grid grid-cols-1 md:grid-cols-2 
          items-center 
          gap-10 
          h-full
          pt-10 md:pt-0
        "
      >


        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-rose-500 leading-tight mb-6">
            Adoção e doação com amor.<br />
            Conectando pets a novos lares, e lares a novos corações.
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Na <span className="font-semibold text-rose-400">Pet&Eu</span>, acreditamos que cada animal merece
            carinho, segurança e a chance de recomeçar. Seja sendo adotado
            ou doado com responsabilidade. 💗🐾
          </p>


          <div className="flex gap-4 mt-6">
            <a
              href="/login"
              className="px-6 py-3 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600 transition-all"
            >
              Login
            </a>

            <a
              href="/register"
              className="px-6 py-3 bg-white text-rose-600 rounded-full shadow-md border border-rose-300 hover:bg-rose-50 transition-all"
            >
              Cadastrar-se
            </a>
          </div>
        </div>


        <div className="flex items-start justify-center md:-mt-20 -mt-10">
          <img
            src={Logo}
            alt="Pet&Eu Logo"
            className="
              w-72 md:w-[380px] 
              opacity-95 
              drop-shadow-[0_0_40px_rgba(255,182,193,0.5)]
            "
          />
        </div>

      </main>
    </div>
  );
}
