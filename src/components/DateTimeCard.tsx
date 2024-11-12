
import React, { useState, useEffect } from 'react';

const DateTimeCard: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Date & Time</h2>
      <p className="text-4xl font-mono text-white">
        {dateTime.toLocaleTimeString()}
      </p>
      <p className="text-xl font-mono text-white mt-2">
        {dateTime.toLocaleDateString()}
      </p>
    </div>
  );
};

export default DateTimeCard;