"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Link from "next/link";

const DarkAmbientWriter = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<{
    [key: number]: { char: string; timestamp: number };
  }>({});

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

  const updateOverlay = useCallback(() => {
    if (overlayRef.current) {
      const now = Date.now();
      const content = Object.entries(charsRef.current)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([, { char, timestamp }]) => {
          const timePassed = now - timestamp;
          const opacity = Math.max(0, 1 - timePassed / 10000);
          if (char === "\n") {
            return "\n";
          } else if (char === " ") {
            return " ";
          }
          return `<span style="opacity: ${opacity}; transition: opacity 0.5s ease;">${char}</span>`;
        })
        .join("");

      overlayRef.current.innerHTML = content.replace(/\n/g, "<br>");
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    const now = Date.now();
    newText.split("").forEach((char, index) => {
      if (!charsRef.current[index] || charsRef.current[index].char !== char) {
        charsRef.current[index] = { char, timestamp: now };
      }
    });

    Object.keys(charsRef.current).forEach((index) => {
      if (Number(index) >= newText.length) {
        delete charsRef.current[Number(index)];
      }
    });

    updateOverlay();
  };

  useEffect(() => {
    const update = () => {
      updateOverlay();
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [updateOverlay]);

  useEffect(() => {
    if (isPlaying) {
      textareaRef.current?.focus();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black text-white p-4">
      <nav className="w-full max-w-2xl mx-auto mb-8 fixed top-0 left-0 right-0 bg-black z-10 p-6">
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
      <div className="w-full max-w-2xl mx-auto text-center mt-16">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <h1 className="text-2xl font-bold text-white">
            Do you feel bad? just write
          </h1>
          <button
            onClick={handlePlayPause}
            className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none rounded-full p-2"
            aria-label={isPlaying ? "pause" : "play"}
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>
        </div>
        <div
          className={`relative w-full h-[calc(100vh-200px)] rounded-lg border transition-colors duration-500 ${
            isPlaying ? "border-white" : "border-neutral-500"
          }`}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder={
              isPlaying ? "Start writing..." : "Play to start writing..."
            }
            disabled={!isPlaying}
            className="w-full h-full p-4 bg-transparent text-transparent resize-none focus:outline-none placeholder-gray-600 rounded-lg caret-white overflow-y-auto text-left"
            style={{ caretColor: "white" }}
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 p-4 pointer-events-none text-gray-300 overflow-y-auto text-left whitespace-pre-wrap break-words"
            aria-live="polite"
            aria-relevant="additions text"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DarkAmbientWriter;
