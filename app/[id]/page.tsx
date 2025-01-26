"use client";

import { FiLoader } from "react-icons/fi";

import { useDetectDevice } from "@/hooks/useDetectDevice";
import { useSystem } from "@/hooks/useSystem";
import { useThemeContext } from "@/hooks/useTheme";
import AboutPage from "@/components/About";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNotSupported from "@/components/MobileNotSupported";
import ModalComponent from "@/components/Modal";
import ModalContent from "@/components/ModalContent";
import Restart from "@/components/Restart";
import TimeCategory from "@/components/TimeCategory";
import UserTyped from "@/components/UserTyped";
import WordContainer from "@/components/WordContainer";
import WordWrapper from "@/components/WordWrapper";

export default function TypingPage() {
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

  if (fetching) {
    return (
      <div className="grid min-h-screen place-content-center">
        <div className="flex items-center">
          <FiLoader size={30} className="animate-spin text-lg" />
          <p className="ml-2 font-medium text-zinc-500">
            Fetching your content
          </p>
        </div>
      </div>
    );
  }

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
            <Header
              restart={restartTest}
              openAboutModal={openModal}
              closeAboutModal={closeModal}
            />
            <TimeCategory
              time={time}
              setLocalStorage={setLocalStorageValue}
              setTime={setTime}
              restart={restartTest}
            />
            <Countdown countdown={countdown} reset={resetCountdown} />
            <WordWrapper
              focused={wordContainerFocused}
              setFocused={setWordContainerFocused}
            >
              <WordContainer word={word} />
              <UserTyped
                word={word}
                check={checkCharacter}
                charTyped={charTyped}
              />
            </WordWrapper>
            {/* <Restart restart={restartTest} /> */}
            <Footer />
            <ModalComponent
              type="result"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            >
              <ModalContent
                totalTime={time}
                results={results}
                history={history}
              />
            </ModalComponent>

            <ModalComponent
              type="about"
              isOpen={aboutModal}
              onRequestClose={closeModal}
            >
              <AboutPage />
            </ModalComponent>
          </>
        )}
      </main>
    </div>
  );
}
