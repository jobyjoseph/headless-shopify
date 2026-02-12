import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <div className="justify-self-start lg:mr-6">
      <h1 className="text-xl font-semibold">
        <Link href="/">Headless</Link>
      </h1>
    </div>
  );
};
