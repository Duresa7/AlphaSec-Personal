"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { bootSequence, type BootLine } from "@/content/boot-sequence";
import { useDesktop } from "@/components/desktop/desktop-context";


function renderLine(line: BootLine, index: number) {
  if (line.type === "blank") {
    return <div key={index} className="h-[1.2em]" />;
  }

  const base = "font-[family-name:var(--font-ibm-plex-mono)] text-[13px] leading-[1.6] whitespace-pre";

  const typeStyles: Record<string, string> = {
    header: "text-[#0078d4] font-semibold boot-glow",
    ok: "text-[#b0b0b0]",
    info: "text-[#8a8a8a]",
    accent: "text-[#0078d4] boot-glow",
    dim: "text-[#555555]",
    warn: "text-[#f5a623]",
    error: "text-[#ff4444]",
  };

  const style = typeStyles[line.type || "info"] || typeStyles.info;

  // Highlight [ OK ] in green for "ok" type lines
  if (line.type === "ok" && line.text.includes("[ OK ]")) {
    const parts = line.text.split("[ OK ]");
    return (
      <div key={index} className={`${base} ${style}`}>
        {parts[0]}
        <span className="text-[#0078d4] font-semibold">[ OK ]</span>
        {parts[1]}
      </div>
    );
  }

  return (
    <div key={index} className={`${base} ${style}`}>
      {line.text}
    </div>
  );
}

export function BootScreen() {
  const { setBootComplete } = useDesktop();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const [waitingForEnter, setWaitingForEnter] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sound hooks — silent until called
  const [playBeep] = useSound("/sounds/bios-beep.wav", { volume: 0.3 });
  const [playClick] = useSound("/sounds/key-click.wav", { volume: 0.08 });
  const [playHdd] = useSound("/sounds/hdd-spin.wav", { volume: 0.15 });

  const playLineSound = useCallback(
    (line: BootLine) => {
      if (line.sound === "beep") playBeep();
      else if (line.sound === "hdd") playHdd();
      else if (line.type !== "blank") playClick();
    },
    [playBeep, playClick, playHdd]
  );

  // Check reduced motion on mount — boot plays on every page load
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setIsVisible(false);
      setBootComplete();
      return;
    }

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Line sequencer
  useEffect(() => {
    if (!isVisible || isExiting || isSkipping) return;

    if (visibleLines >= bootSequence.length) {
      setWaitingForEnter(true);
      return;
    }

    const currentLine = bootSequence[visibleLines];
    timeoutRef.current = setTimeout(() => {
      playLineSound(currentLine);
      setVisibleLines((prev) => prev + 1);
    }, currentLine.delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible, isExiting, isSkipping, visibleLines, playLineSound]);

  // Auto-scroll as lines appear or when waiting for Enter
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleLines, waitingForEnter]);

  // Auto-continue 2s after "Press ENTER" appears
  useEffect(() => {
    if (!waitingForEnter || isExiting) return;
    const timer = setTimeout(() => triggerExit(), 2000);
    return () => clearTimeout(timer);
  }, [waitingForEnter, isExiting]);

  function triggerExit() {
    setIsExiting(true);
    // Restore scroll after exit animation
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 900);
  }

  function handleSkip() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsSkipping(true);
    setVisibleLines(bootSequence.length);
    setTimeout(() => {
      triggerExit();
    }, 300);
  }

  // Don't render if not visible
  if (!isVisible && !isExiting) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsVisible(false);
        setIsExiting(false);
        setBootComplete();
      }}
    >
      {!isExiting && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
        >
          {/* Fullscreen CRT terminal */}
          <div className="boot-crt relative w-full h-full overflow-hidden">
            {/* Scanline overlay */}
            <div className="boot-scanlines pointer-events-none absolute inset-0 z-30" />

            {/* Screen reflection/glare */}
            <div className="boot-reflection pointer-events-none absolute inset-0 z-20" />

            {/* Vignette overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)]" />

            {/* Terminal content area */}
            <div
              ref={scrollRef}
              className="relative z-0 h-full overflow-y-auto overflow-x-hidden bg-[#0a0a0a] p-4 sm:p-6 md:p-8 boot-flicker"
            >
              {/* Boot output lines */}
              <div className="min-h-0">
                {bootSequence.slice(0, visibleLines).map((line, i) =>
                  renderLine(line, i)
                )}

                {/* Blinking cursor or Enter prompt */}
                {visibleLines > 0 && !isExiting && !waitingForEnter && (
                  <span className="inline-block w-[8px] h-[14px] bg-[#0078d4] animate-[blink_1s_step-end_infinite] ml-0.5 mt-1 align-middle" />
                )}
                {waitingForEnter && (
                  <div className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#0078d4] boot-glow animate-[blink_1.2s_step-end_infinite]">
                    Press ENTER to continue...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="fixed bottom-6 right-6 z-[110] font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#555] hover:text-[#0078d4] border border-[#2a2a2a] hover:border-[#0078d4]/40 px-4 py-2 rounded transition-colors duration-200 bg-[#0a0a0a]/80 backdrop-blur-sm"
            aria-label="Skip boot sequence"
          >
            SKIP <span className="text-[#444] ml-1">[ ESC ]</span>
          </button>

          {/* Keyboard shortcuts: ESC to skip, Enter to proceed */}
          <KeyHandler onEscape={handleSkip} onEnter={waitingForEnter ? triggerExit : undefined} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Keyboard listener for ESC (skip) and Enter (proceed) */
function KeyHandler({
  onEscape,
  onEnter,
}: {
  onEscape: () => void;
  onEnter?: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onEscape();
      if (e.key === "Enter" && onEnter) onEnter();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onEscape, onEnter]);
  return null;
}
