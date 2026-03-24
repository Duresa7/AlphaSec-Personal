"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/content/site";

type Review = Testimonial;

interface TestimonialSliderProps {
  reviews: Review[];
  className?: string;
}

const imageVariants = {
  enter: (direction: "left" | "right") => ({
    y: direction === "right" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (direction: "left" | "right") => ({
    y: direction === "right" ? "-100%" : "100%",
    opacity: 0,
  }),
};

const textVariants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? 50 : -50,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? -50 : 50,
    opacity: 0,
  }),
};

export const TestimonialSlider = ({
  reviews,
  className,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const thumbnailReviews = reviews
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  return (
    <div
      className={cn(
        "network-panel relative w-full min-h-[650px] overflow-hidden bg-background p-8 text-foreground md:min-h-[600px] md:p-12",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-line/80 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          operator feedback
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          trusted signals
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
        <div className="order-2 flex flex-col justify-between md:col-span-2 md:order-1">
          <div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
            <span className="text-sm text-muted font-mono">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(reviews.length).padStart(2, "0")}
            </span>
            <h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block">
              Reviews
            </h2>
          </div>

          <div className="flex space-x-2 mt-8 md:mt-0">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex(
                (r) => r.id === review.id
              );
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-md w-16 h-20 md:w-20 md:h-24 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={`View review from ${review.name}`}
                >
                  <Image
                    src={review.thumbnailSrc}
                    alt={review.name}
                    width={80}
                    height={96}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-1 relative h-80 min-h-[400px] md:col-span-4 md:order-2 md:min-h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 overflow-hidden border border-line"
            >
              <Image
                src={activeReview.imageSrc}
                alt={activeReview.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                unoptimized
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="route-track pointer-events-none absolute bottom-4 left-4 right-4 h-4" />
        </div>

        <div className="order-3 flex flex-col justify-between md:col-span-6 md:order-3">
          <div className="relative overflow-hidden pt-4 md:pt-12 min-h-[200px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {activeReview.affiliation}
                </p>
                <h3 className="mt-2 text-xl font-semibold">
                  {activeReview.name}
                </h3>
                <blockquote className="mt-6 border-l border-accent/35 pl-5 text-lg font-medium leading-relaxed md:text-xl">
                  &ldquo;{activeReview.quote}&rdquo;
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-2 mt-8 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-line"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-12 h-12 bg-accent text-background hover:bg-accent/90"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
