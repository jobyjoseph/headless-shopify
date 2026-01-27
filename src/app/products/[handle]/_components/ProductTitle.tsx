import React from "react";

interface ProductTitleProps {
  title: string;
}

export const ProductTitle = ({ title }: ProductTitleProps) => {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-normal tracking-wide">
        {title}
      </h1>
    </div>
  );
};
