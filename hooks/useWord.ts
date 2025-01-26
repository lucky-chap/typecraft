"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { generateWord } from "../utils";
import { useSystem } from "./useSystem";

export const useWord = (numberOfWords: number) => {
  const pahtname = usePathname();
  const [notFound, setNotFound] = useState<boolean>(false);
  const id = pahtname.split("/")[1] ?? "fake-id";
  const [fetching, setFetching] = useState<boolean>(true);
  const [word, setWord] = useState<string>("");
  const [totalWord, setTotalWord] = useState<string>("");

  const getWord = async (numberOfWords: number, id: string) => {
    // fetch from /api/fetch
    const res = await fetch("/api/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();

    const typingContent =
      data.success == true
        ? data.content + " "
        : generateWord(numberOfWords) + " ";

    if (data.success == false) {
      setNotFound(true);
    }

    return typingContent;
  };

  useEffect(() => {
    const fetchWord = async () => {
      const fetchedWord = await getWord(numberOfWords, id);
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
    notFound,
    setNotFound,
  };
};
