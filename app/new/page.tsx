"use client";

import Image from "next/image";
import Link from "next/link";

import { useDetectDevice } from "@/hooks/useDetectDevice";
import { useSystem } from "@/hooks/useSystem";
import { useThemeContext } from "@/hooks/useTheme";
import Header from "@/components/Header";
import MobileNotSupported from "@/components/MobileNotSupported";

export default function Home() {
  const { systemTheme } = useThemeContext();

  const {
    charTyped,
    countdown,
    word,
    wordContainerFocused,
    modalIsOpen,
    aboutModal,
    history,
    time,
    fetching,
    results,
    resetCountdown,
    setLocalStorageValue,
    setWordContainerFocused,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
    setTime,
  } = useSystem();
  const isMobile = useDetectDevice();

  const handleCreateNewGame = async () => {
    try {
      const res = await fetch("/api/new", {
        method: "GET",
      });
      const data = await res.json();
      console.log("Data from new route", data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="h-screen w-full overflow-y-auto"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <main
        className="mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"
        style={{}}
      >
        {isMobile ? (
          <MobileNotSupported />
        ) : (
          <>
            <Header openAboutModal={openModal} closeAboutModal={closeModal} />
            <div className="mx-auto flex max-w-5xl flex-col">
              <h1
                className={`text-center font-mono text-2xl font-bold lg:text-3xl`}
              >
                Create a new typing game
              </h1>
              <div className="my-10">
                <div className="mb-4">
                  <label
                    htmlFor="default-input"
                    style={{
                      color: systemTheme.text.secondary,
                      fontWeight: 500,
                    }}
                    className="mb-2 block text-sm font-medium"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    id="default-input"
                    style={{
                      backgroundColor: systemTheme.background.secondary,
                      color: systemTheme.text.secondary,
                      borderColor: systemTheme.background.secondary,
                    }}
                    className="block w-full rounded-lg p-2.5 text-sm text-gray-900"
                  />
                </div>
                {/* Difficulty */}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    style={{
                      color: systemTheme.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    Difficulty
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    style={{
                      backgroundColor: systemTheme.background.secondary,
                      color: systemTheme.text.secondary,
                      borderColor: systemTheme.background.secondary,
                    }}
                  >
                    <option defaultValue={undefined} selected>
                      Select difficulty
                    </option>
                    <option defaultValue="Easy">Easy</option>
                    <option defaultValue="Medium">Medium</option>
                    <option defaultValue="Hard">Hard</option>
                  </select>
                </div>
                {/* Persona */}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    style={{
                      color: systemTheme.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    Persona
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    style={{
                      backgroundColor: systemTheme.background.secondary,
                      color: systemTheme.text.secondary,
                      borderColor: systemTheme.background.secondary,
                    }}
                  >
                    <option defaultValue={undefined} selected>
                      Select persona
                    </option>
                    <option defaultValue="Snoop Dogg">Snoop Dogg</option>
                    <option defaultValue="Pirate">Pirate</option>
                    <option defaultValue="Poet">Poet</option>
                    <option defaultValue="Philosopher">Philosopher</option>
                    <option defaultValue="Rick from Rick and Morty">
                      Rick from Rick and Morty
                    </option>
                    <option defaultValue="Journalist">Journalist</option>
                    <option defaultValue="Technical Writer">
                      Technical Writer
                    </option>
                  </select>
                </div>
                {/* Max words */}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    style={{
                      color: systemTheme.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    Maximum words
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    style={{
                      backgroundColor: systemTheme.background.secondary,
                      color: systemTheme.text.secondary,
                      borderColor: systemTheme.background.secondary,
                    }}
                  >
                    <option defaultValue={undefined} selected>
                      Select maximum words
                    </option>
                    <option defaultValue="30">30</option>
                    <option defaultValue="45">45</option>
                    <option defaultValue="60">60</option>
                  </select>
                </div>
                {/* Order */}
                <div className="mb-10 w-full">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    style={{
                      color: systemTheme.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    Order
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    style={{
                      backgroundColor: systemTheme.background.secondary,
                      color: systemTheme.text.secondary,
                      borderColor: systemTheme.background.secondary,
                    }}
                  >
                    <option defaultValue={undefined} selected>
                      Select order
                    </option>
                    <option defaultValue="Left to right">Left to right</option>
                    <option defaultValue="Right to left">Right to left</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="mb-4 w-full">
                  <button
                    disabled
                    onClick={handleCreateNewGame}
                    className="block w-full rounded-lg bg-blue-500 p-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    style={{
                      backgroundColor: systemTheme.background.secondary,
                      color: systemTheme.text.secondary,
                    }}
                  >
                    Create game
                  </button>
                  <p className="mx-auto max-w-sm">
                    Creating new games from this site has been disabled
                    (Agent.ai issues) . Please create one over{" "}
                    <a
                      className="font-bold underline"
                      href="https://agent.ai/agent/typecraft"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
