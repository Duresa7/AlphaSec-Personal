"use client";

import { useEffect, useRef, useState } from "react";

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
  const completionRef = useRef(false);
  const done = displayedText.length >= text.length;

  useEffect(() => {
    if (done) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, displayedText.length === 0 ? delay : speed);

    return () => window.clearTimeout(timer);
  }, [delay, displayedText, done, speed, text]);

  useEffect(() => {
    if (done && !completionRef.current) {
      completionRef.current = true;
      onComplete?.();
    }
  }, [done, onComplete]);

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
