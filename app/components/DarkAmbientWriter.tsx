"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const DarkAmbientWriter = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sound.mp3");
    audioRef.current.loop = true;
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        textareaRef.current?.focus();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => {
      const lines = textarea.value.split("\n");
      lines.forEach((line, index) => {
        setTimeout(() => {
          const spans = textarea.parentNode?.querySelectorAll("span");
          if (spans && spans[index]) {
            spans[index].classList.add("fade-out");
          }
        }, 10000); // 10 seconds
      });
    };

    textarea.addEventListener("input", handleInput);
    return () => textarea.removeEventListener("input", handleInput);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-10 space-x-2">
          <h1 className="text-2xl font-bold">do you feel bad? just write</h1>
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none"
            aria-label={isPlaying ? "pause" : "play"}
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>
        </div>
        <div className="relative w-full rounded-2xl border transition-colors duration-200">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder={
              isPlaying ? "start writing..." : "play to start writing..."
            }
            disabled={!isPlaying}
            className={`w-full h-[calc(100vh-200px)] p-4 bg-black text-white resize-none focus:outline-none placeholder-gray-500 rounded-2xl ${
              isPlaying ? "border-white" : "border-neutral-500"
            }`}
          />
          <div className="absolute inset-0 p-4 pointer-events-none">
            {text.split("\n").map((line, index) => (
              <span
                key={index}
                className="block transition-opacity duration-[10s] ease-out fade-out-active"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkAmbientWriter;
