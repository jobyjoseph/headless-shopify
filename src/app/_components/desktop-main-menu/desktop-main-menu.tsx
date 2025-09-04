import React from "react";

const DesktopMainMenu = () => {
  return (
    <ul className="hidden lg:flex justify-self-start gap-8 text-lg">
      <li>
        <a href="#">Women</a>
      </li>
      <li>
        <a href="#">Men</a>
      </li>
      <li>
        <a href="#">Kids</a>
      </li>
      <li>
        <a href="#">Accessories</a>
      </li>
    </ul>
  );
};

export default DesktopMainMenu;
