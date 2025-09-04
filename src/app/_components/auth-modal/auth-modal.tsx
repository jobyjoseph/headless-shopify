"use client";
import React, { useState } from "react";
import AuthModalClose from "./modal-close/modal-close";
import heroImg from "./hero.jpg";
import Image from "next/image";
import SignUpForm from "./signup-form/signup-form";
import SignInForm from "./signin-form/signin-form";

const AuthModal = () => {
  const [activeForm, setActiveForm] = useState("sign-in");

  const setSignUpFormActive = () => {
    setActiveForm("sign-up");
  };

  const setSignInFormActive = () => {
    setActiveForm("sign-in");
  };

  return (
    <div
      id="auth-modal"
      className="fixed inset-0 z-50 hidden bg-black/50 flex items-center justify-center"
    >
      <div className="bg-white w-sm md:w-lg relative">
        <AuthModalClose />
        <Image
          src={heroImg}
          alt="Auth modal hero image"
          width={690}
          height={373}
        />
        <div className="px-10 py-6">
          <div className="font-bold grid grid-cols-[1fr_1fr] border-b-1 border-gray-300 text-lg">
            <div
              className={`text-center ${
                activeForm == "sign-up" ? "border-b-4" : ""
              } pb-4 cursor-pointer`}
              onClick={setSignUpFormActive}
            >
              JOIN NOW
            </div>
            <div
              className={`text-center ${
                activeForm == "sign-in" ? "border-b-4" : ""
              } pb-4 cursor-pointer`}
              onClick={setSignInFormActive}
            >
              SIGN IN
            </div>
          </div>
          {activeForm == "sign-up" ? <SignUpForm /> : null}
          {activeForm == "sign-in" ? <SignInForm /> : null}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
