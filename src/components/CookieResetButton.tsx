
import React from 'react';

const CookieResetButton: React.FC = () => {
  const resetCookiesAndLocalStorage = () => {

    const cookies = document.cookie.split(";");
    const exclusions = ['none'];

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (!exclusions.includes(name)) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    }


    localStorage.clear();



    window.location.reload();
  };

  return (
    <button
      onClick={resetCookiesAndLocalStorage}
      className="glassmorphism-button bg-red-500 bg-opacity-30 hover:bg-opacity-40 text-white px-4 py-2 rounded-lg text-sm"
    >
      Reset
    </button>
  );
};

export default CookieResetButton;
