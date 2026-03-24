"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  caption?: string;
  className?: string;
}

export function VideoPlayer({ src, caption, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={className}>
      <div
        className="group relative border border-line overflow-hidden cursor-pointer"
        style={{ aspectRatio: "16 / 9" }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          onEnded={() => {
            setIsPlaying(false);
          }}
          playsInline
          preload="metadata"
        />

        <div
          className={`absolute inset-0 flex items-center justify-center bg-background/40 transition-opacity duration-300 ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center border border-accent/50 bg-background/80 text-accent backdrop-blur-sm transition-transform hover:scale-105">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </div>
        </div>
      </div>

      {caption && (
        <p className="mt-2 font-mono text-[10px] text-muted">
          {"// "} {caption}
        </p>
      )}
    </div>
  );
}
