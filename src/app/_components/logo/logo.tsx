import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="justify-self-start lg:mr-6">
      <h1 className="text-xl">
        <Link href="/">
          <Image
            src="/running-shoe.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-16"
          />
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
