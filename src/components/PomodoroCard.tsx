import React, { useState, useEffect } from 'react';

const PomodoroCard: React.FC = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [originalHours, setOriginalHours] = useState(0);
  const [originalMinutes, setOriginalMinutes] = useState(25);

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setIsActive(false);
        }
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [isActive, hours, minutes, seconds]);

  const startTimer = () => {

    if (!isActive) {
      setHours(hours || inputHours);  
      setMinutes(minutes || inputMinutes);  
    }
    setIsActive(true);  
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(originalHours);
    setMinutes(originalMinutes);
    setSeconds(0);
    setInputHours(originalHours);
    setInputMinutes(originalMinutes);
  };

  useEffect(() => {
    setOriginalHours(inputHours);
    setOriginalMinutes(inputMinutes);
  }, [inputHours, inputMinutes]);

  return (
    <div className="glassmorphism p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">Pomodoro Timer</h2>

      <div className="flex justify-center space-x-2 mb-4">
        <div className="flex items-center">
          <span className="text-white text-lg mr-1">H:</span>
          <input
            type="number"
            value={inputHours}
            onChange={(e) => setInputHours(Math.max(0, parseInt(e.target.value)))}
            className="w-14 sm:w-16 px-2 py-1 rounded bg-white bg-opacity-20 text-white text-center"
            placeholder="HH"
            disabled={isActive}
          />
        </div>
        <div className="flex items-center">
          <span className="text-white text-lg mr-1">M:</span>
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(Math.min(59, Math.max(0, parseInt(e.target.value))))}
            className="w-14 sm:w-16 px-2 py-1 rounded bg-white bg-opacity-20 text-white text-center"
            placeholder="MM"
            disabled={isActive}
          />
        </div>
      </div>

      <div className="text-3xl sm:text-4xl md:text-5xl font-mono text-white mb-4 text-center">
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={isActive ? toggleTimer : startTimer}
          className="glassmorphism-button text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="glassmorphism-button text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroCard;