"use client";
import CloseIcon from "@/components/icons/close/close-icon";
import React from "react";

const AuthModalClose = () => {
  const closeAuthModal = () => {
    document.getElementById("auth-modal").classList.add("hidden");
  };
  return (
    <button
      className="absolute top-3 right-3 text-gray-400 hover:text-black cursor-pointer"
      onClick={closeAuthModal}
    >
      <CloseIcon width={24} height={24} />
    </button>
  );
};

export default AuthModalClose;
