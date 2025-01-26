"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export const useModal = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [notFoundModal, setNotFoundModal] = useState(false);

  const openModal = useCallback((type: string) => {
    if (type === "result") setModalIsOpen(true);
    else if (type === "notfound") setNotFoundModal(true);
    else setAboutModal(true);
  }, []);

  const closeModal = useCallback((type: string) => {
    if (type === "result") setModalIsOpen(false);
    else if (type === "notfound") setNotFoundModal(false);
    else setAboutModal(false);
    if (type === "result") router.push("/");
  }, []);

  return { modalIsOpen, aboutModal, notFoundModal, openModal, closeModal };
};
