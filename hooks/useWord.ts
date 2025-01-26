"use client";

import { useCallback, useEffect, useState } from "react";
import prisma from "@/utils/prisma";

import { generateWord } from "../utils";

const getWord = async (numberOfWords: number) => {
  // fetch from /api/fetch
  const res = await fetch("/api/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: "7ecfaaf7-9b27-45aa-90d2-1eddac2d0a57" }),
  });

  const data = await res.json();

  const typingContent = data
    ? data.content + " "
    : generateWord(numberOfWords) + " ";

  return typingContent;
};

export const useWord = (numberOfWords: number) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [word, setWord] = useState<string>("");
  const [totalWord, setTotalWord] = useState<string>("");

  useEffect(() => {
    const fetchWord = async () => {
      const fetchedWord = await getWord(numberOfWords);
      setWord(fetchedWord);
      setTotalWord(fetchedWord);
      setFetching(false);
    };
    fetchWord();
  }, []);

  const appendWord = useCallback((word: string) => {
    setTotalWord((prev) => prev + word);
  }, []);

  const eraseWord = useCallback((word: string) => {
    setTotalWord(word);
  }, []);

  const updateWord = useCallback(
    (erase = false) => {
      setWord(() => {
        const genWord = generateWord(numberOfWords) + " ";
        if (erase) eraseWord(genWord);
        else appendWord(genWord);
        return genWord;
      });
    },
    [numberOfWords, appendWord, eraseWord]
  );

  return {
    word,
    totalWord,
    setTotalWord,
    updateWord,
    appendWord,
    fetching,
    setFetching,
  };
};
