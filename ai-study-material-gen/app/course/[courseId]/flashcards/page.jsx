"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import FlashCardItem from "./_components/FlashCardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Flashcards() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [flippedStates, setFlippedStates] = useState([]);
  const [api, setApi] = useState();
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    GetFlashcards();
  }, [courseId]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setFlippedStates((prev) => prev.map(() => false));
    });
  }, [api]);

  const GetFlashcards = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "Flashcard",
      });
  
      const cards = result?.data?.content;
      const flashcardsArray = Array.isArray(cards?.flashcards) ? cards.flashcards : [];
  
      setFlashcards(flashcardsArray);
      setFlippedStates(new Array(flashcardsArray.length).fill(false));
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
    setLoading(false);
  };
  

  const handleClick = (index) => {
    setFlippedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="mx-5 md:mx-36 lg:px-60 mt-10 mb-5">
      <h2 className="font-bold text-2xl">Flashcards</h2>
      <p className="text-gray-500">Flashcards: The ultimate tool to lock in concepts!</p>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center">
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="w-[280px] h-[240px] md:w-[300px] md:h-[250px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <Carousel setApi={setApi}>
            <CarouselContent>
              {flashcards?.map((card, index) => (
                <CarouselItem key={index} className="flex justify-center items-center">
                  <FlashCardItem
                    handleClick={() => handleClick(index)}
                    isFlipped={flippedStates[index]}
                    flashcard={card}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default Flashcards;
