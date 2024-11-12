import React, { useEffect, useState } from 'react';
import SearchCard from './components/SearchCard';
import DateTimeCard from './components/DateTimeCard';
import WeatherCard from './components/WeatherCard';
import NoteCard from './components/NoteCard';
import ShortcutCard from './components/ShortcutCard';
import PomodoroCard from './components/PomodoroCard';
import CookieResetButton from './components/CookieResetButton';
import BackgroundChangeButton from './components/BackgroundChangeButton';

const App: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBackgroundImage = localStorage.getItem('backgroundImage');
    
    if (storedBackgroundImage) {
      setBackgroundImage(storedBackgroundImage);
    } else {
      setBackgroundImage('back.jpg');
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-500"></div>;
  }

  return (
    <div
      className="min-h-screen p-4 sm:p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4 space-x-4">
          <CookieResetButton />
          <BackgroundChangeButton setBackgroundImage={setBackgroundImage} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <SearchCard />
          <DateTimeCard />
          <WeatherCard />
          <NoteCard />
          <ShortcutCard />
          <PomodoroCard />
        </div>
      </div>
    </div>
  );
};

export default App;
