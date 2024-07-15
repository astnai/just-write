import React from "react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black text-gray-300 p-6">
      <nav className="w-full max-w-2xl mx-auto mb-10 fixed top-0 left-0 right-0 bg-black z-10 p-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full max-w-2xl mx-auto text-center mt-16">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <h1 className="text-2xl font-bold text-white">About</h1>
        </div>
        <div className="text-left p-4">
          <p className="mb-4">
            Dark Ambient Writer is a minimalist writing application designed to
            provide a unique and immersive writing experience, inspired by the
            author&apos;s personal coping mechanism for sadness.
          </p>
          <p className="mb-4">
            The demo showcases the author&apos;s approach to emotional relief:
            writing while listening to dark ambient music. This experience is
            simulated in the app by allowing users to write only when the
            ambient sound is playing, activated by pressing the play button.
          </p>
          <p className="mb-4">
            A distinctive feature of Dark Ambient Writer is the gradual
            disappearance of the text as you write. This reflects the
            author&apos;s belief that the act of writing is meant to be a
            present-focused release of thoughts and emotions, rather than a
            record of the past. The words fade away, mirroring the transient
            nature of our feelings and emphasizing the importance of expressing
            what&apos;s on your mind right now and moving forward.
          </p>
          <p className="mb-4">
            Whether you&apos;re journaling, brainstorming, or simply seeking a
            way to unburden your mind, Dark Ambient Writer offers a
            distraction-free environment to help you focus on your thoughts and
            emotions in the moment.
          </p>
          <p className="mb-4">
            This demo was developed by{" "}
            <Link
              href="https://your-website-link-here.com"
              className="text-white underline hover:text-gray-300"
            >
              Agustín Arias
            </Link>
            . You can find the source code on{" "}
            <Link
              href="https://your-repo-link-here.com"
              className="text-white underline hover:text-gray-300"
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
