import React from "react";

const SignUpForm = () => {
  return (
    <form>
      <div className="grid grid-cols-[1fr_1fr] mt-6 gap-4">
        <div>
          <input
            type="text"
            className="border border-gray-300 w-full px-3 py-1.5 outline-none"
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            type="text"
            className="border border-gray-300 w-full px-3 py-1.5 outline-none"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="mt-6">
        <input
          type="text"
          className="border border-gray-300 w-full px-3 py-1.5 outline-none"
          placeholder="Email"
        />
      </div>
      <div className="mt-6">
        <input
          type="password"
          className="border border-gray-300 w-full px-3 py-1.5 outline-none"
          placeholder="Password"
        />
      </div>
      <div className="mt-6">
        <input
          type="text"
          className="border border-gray-300 w-full px-3 py-1.5 outline-none"
          placeholder="Phone Number (optional)"
        />
      </div>
      <div className="mt-6">
        <div className="text-sm font-medium text-gray-500 mb-1">
          Enter your birthday to receive a free gift
        </div>
        <input
          type="text"
          className="border border-gray-300 w-full px-3 py-1.5 outline-none"
          placeholder="MM/DD (optional)"
        />
      </div>
      <div className="mt-6">
        <button className="w-full py-2 bg-black text-white font-black tracking-wider">
          JOIN NOW
        </button>
      </div>
      <div className="mt-3 text-center text-sm text-gray-500">
        By joining, you agree to our{" "}
        <a href="#" className="text-[#7183b0] underline">
          Terms of Service
        </a>{" "}
        and to receive our email newsletter.
      </div>
    </form>
  );
};

export default SignUpForm;
