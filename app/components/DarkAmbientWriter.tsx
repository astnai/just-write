"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

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
      overlayRef.current.innerHTML = Object.entries(charsRef.current)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([index, { char, timestamp }]) => {
          const timePassed = now - timestamp;
          const opacity = Math.max(0, 1 - timePassed / 10000);
          return `<span style="opacity: ${opacity}">${
            char === " " ? "&nbsp;" : char
          }</span>`;
        })
        .join("");
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
    const intervalId = setInterval(updateOverlay, 100);
    return () => clearInterval(intervalId);
  }, [updateOverlay]);

  useEffect(() => {
    if (isPlaying) {
      textareaRef.current?.focus();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <h1 className="text-2xl font-bold">do you feel bad? just write</h1>
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none"
            aria-label={isPlaying ? "pause" : "play"}
          >
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>
        </div>
        <div
          className={`relative w-full h-[calc(100vh-120px)] rounded-2xl border transition-colors duration-500 ${
            isPlaying ? "border-white" : "border-neutral-500"
          }`}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder={
              isPlaying ? "start writing..." : "play to start writing..."
            }
            disabled={!isPlaying}
            className="w-full h-full p-4 bg-transparent text-transparent resize-none focus:outline-none placeholder-gray-500 rounded-2xl caret-white overflow-y-auto"
            style={{ caretColor: "white" }}
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 p-4 pointer-events-none text-white whitespace-pre-wrap break-words text-left overflow-y-auto"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DarkAmbientWriter;
