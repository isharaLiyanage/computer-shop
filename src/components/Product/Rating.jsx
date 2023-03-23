import { StarIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import classNames from "classnames";
import React from "react";

function Rating({ rating }) {
  const [filledStars, setFilledStars] = useState(0);

  useEffect(() => {
    setFilledStars(Math.round(rating));
  }, [rating]);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          className={classNames(
            "h-5 w-5",
            index < filledStars ? "text-yellow-500" : "text-gray-400"
          )}
        />
      ))}
    </div>
  );
}

export default Rating;
