"use client";

import { useCallback, useState } from "react";

import type { HistoryType, Results } from "../types";
import {
  calculateAccuracy,
  calculateErrorPercentage,
  calculateWPM,
} from "../utils";
import { useCountdown } from "./useCountdown";
import { useKeyDown } from "./useKeyDown";
import { useLocalStorage } from "./useLocalStorage";
import { useModal } from "./useModal";
import { useWord } from "./useWord";

export const useSystem = () => {
  const [results, setResults] = useState<Results>({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    error: 0,
  });

  const [history, setHistory] = useState<HistoryType>({
    wordHistory: "",
    typedHistory: "",
  });

  const { setLocalStorageValue, getLocalStorageValue } = useLocalStorage();
  const [wordContainerFocused, setWordContainerFocused] = useState(false);
  const [time, setTime] = useState(() => getLocalStorageValue("time") || 15000);
  const { countdown, resetCountdown, startCountdown } = useCountdown(time);
  const {
    word,
    updateWord,
    totalWord,
    fetching,
    setFetching,
    notFound,
    setNotFound,
  } = useWord(30);
  const {
    charTyped,
    typingState,
    cursorPosition,
    totalCharacterTyped,
    resetCharTyped,
    resetCursorPointer,
    setTotalCharacterTyped,
    setTypingState,
  } = useKeyDown(wordContainerFocused);
  const { modalIsOpen, aboutModal, notFoundModal, openModal, closeModal } =
    useModal();

  const restartTest = useCallback(() => {
    resetCountdown();
    updateWord(true);
    resetCursorPointer();
    resetCharTyped();
    setTypingState("idle");
    setTotalCharacterTyped("");
  }, [
    resetCountdown,
    updateWord,
    resetCursorPointer,
    resetCharTyped,
    setTypingState,
    setTotalCharacterTyped,
  ]);

  const checkCharacter = useCallback(
    (index: number) => {
      if (charTyped[index] === word[index]) {
        return true;
      } else {
        return false;
      }
    },
    [charTyped, word]
  );

  if (word.length === charTyped.length) {
    updateWord();
    resetCharTyped();
    resetCursorPointer();
  }

  if (typingState === "start") {
    startCountdown();
    setTypingState("typing");
  }

  if (countdown === 0) {
    const { accuracy } = calculateAccuracy(totalWord, totalCharacterTyped);
    const { wpm, cpm } = calculateWPM(totalCharacterTyped, accuracy, time);
    const error = calculateErrorPercentage(accuracy);

    setResults({
      accuracy,
      wpm,
      cpm,
      error,
    });

    setHistory({
      wordHistory: totalWord,
      typedHistory: totalCharacterTyped,
    });

    openModal("result");
    restartTest();
  }

  return {
    charTyped,
    countdown,
    cursorPosition,
    modalIsOpen,
    aboutModal,
    notFoundModal,
    results,
    time,
    history,
    word,
    wordContainerFocused,
    fetching,
    notFound,
    setWordContainerFocused,
    setTime,
    resetCountdown,
    setLocalStorageValue,
    updateWord,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setFetching,
    setNotFound,
  };
};
