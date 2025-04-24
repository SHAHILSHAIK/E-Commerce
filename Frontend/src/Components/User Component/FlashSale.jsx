import React, { useEffect, useState } from "react";

const FlashSale = () => {
  const getInitialTime = () => {
    const savedTime = localStorage.getItem("flashSaleTime");
    const now = Math.floor(Date.now() / 1000);
    return savedTime ? Math.max(0, savedTime - now) : 3600;
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    localStorage.setItem("flashSaleTime", now + timeLeft);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="py-10 bg-red-50 text-center">
      <h2 className="text-3xl font-bold text-red-600">
        🔥 Flash Sale! Limited Time Only!
      </h2>
      <p className="text-lg my-2">
        Hurry! Offer ends in:{" "}
        <span className="font-bold text-red-500">{formatTime(timeLeft)}</span>
      </p>
     
    </div>
  );
};

export default FlashSale;
