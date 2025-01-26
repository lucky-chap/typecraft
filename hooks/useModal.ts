"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export const useModal = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  const openModal = useCallback((type: string) => {
    if (type === "result") setModalIsOpen(true);
    else setAboutModal(true);
  }, []);

  const closeModal = useCallback((type: string) => {
    if (type === "result") setModalIsOpen(false);
    else setAboutModal(false);
    router.push("/");
  }, []);

  return { modalIsOpen, aboutModal, openModal, closeModal };
};
