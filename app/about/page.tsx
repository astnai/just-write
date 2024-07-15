"use client";

import React from "react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black text-white">
      <nav className="w-full max-w-2xl mx-auto mb-10 fixed top-0 left-0 right-0 bg-black z-10 p-6">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="hover:text-neutral-500 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-neutral-500 transition-colors"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full max-w-2xl mx-auto text-center mt-10">
        <div className="text-left sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <p className="mb-4">
            This app is a minimalist writing tool inspired by the author&apos;s
            way of coping with sadness. It lets you write only when dark ambient
            music plays, simulating the author&apos;s emotional relief method.
          </p>
          <p className="mb-4">
            A unique feature is the text disappearing as you write, emphasizing
            the present moment and the transient nature of feelings.
          </p>
          <p className="mb-4">
            Developed by{" "}
            <Link
              href="https://agustinarias.com"
              className="text-neutral-400 underline transition-colors duration-300 hover:text-white hover:underline"
            >
              Agustín Arias
            </Link>
            . Find the source code on{" "}
            <Link
              href="https://github.com/astnai/just-write"
              className="text-neutral-400 underline transition-colors duration-300 hover:text-white hover:underline"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
