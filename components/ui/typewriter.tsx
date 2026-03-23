"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({
  text,
  speed = 40,
  delay = 300,
  onComplete,
  className = "",
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setDone(true);
      onComplete?.();
    }
  }, [started, displayedText, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block w-[2px] h-[1em] ml-[1px] align-middle bg-accent ${
          done ? "animate-blink" : ""
        }`}
      />
    </span>
  );
}
