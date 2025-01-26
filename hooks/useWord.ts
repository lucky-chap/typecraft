"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { generateWord } from "../utils";

export const useWord = (numberOfWords: number) => {
  const router = useRouter();
  const pahtname = usePathname();
  const [notFound, setNotFound] = useState<boolean>(false);
  const gameId = pahtname.split("/")[1] ?? "fake-id";
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

    console.log("Content fetched", data);

    const typingContent =
      data.success == true
        ? data.content + " "
        : generateWord(numberOfWords) + " ";

    if (data.success == false) {
      router.push("/not-found");
    }

    return { text: typingContent, success: data.success };
  };

  useEffect(() => {
    const fetchWord = async () => {
      const fetchedWord = await getWord(numberOfWords, gameId);
      setWord(fetchedWord.text);
      setTotalWord(fetchedWord.text);
      setFetching(false);
      // if (fetchedWord.success == false) {
      //   router.push("/not-found");
      // }
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
