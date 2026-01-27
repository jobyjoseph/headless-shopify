import React from "react";
import Link from "next/link";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

const StarIcon = ({ fillPercentage }: { fillPercentage: number }) => {
  const clipId = React.useId();
  const starPath =
    "M10 1l2.39 6.53H19l-5.3 4.09 1.91 6.38L10 14.27 4.39 18l1.91-6.38L1 7.53h6.61z";

  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={`${fillPercentage * 20}`} height="20" />
        </clipPath>
      </defs>
      {/* Gray background star */}
      <path className="text-gray-300" fill="currentColor" d={starPath} />
      {/* Golden filled star with clip */}
      <path
        className="text-amber-500"
        fill="currentColor"
        clipPath={`url(#${clipId})`}
        d={starPath}
      />
    </svg>
  );
};

export const ProductRating = ({ rating, reviewCount }: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.min(1, Math.max(0, rating - (star - 1)));
          return <StarIcon key={star} fillPercentage={fillPercentage} />;
        })}
      </div>
      <span className="font-light text-gray-600">({reviewCount})</span>
      <Link
        href="#reviews"
        className="font-light text-gray-600 underline hover:text-gray-900"
      >
        Review Summary
      </Link>
    </div>
  );
};
