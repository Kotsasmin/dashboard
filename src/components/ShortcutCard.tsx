import React, { useState, useEffect } from 'react';

interface Shortcut {
  name: string;
  url: string;
}

const ShortcutCard: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [newShortcut, setNewShortcut] = useState<Shortcut>({ name: '', url: '' });

  useEffect(() => {
    const savedShortcuts = localStorage.getItem('userShortcuts');
    if (savedShortcuts) setShortcuts(JSON.parse(savedShortcuts));
  }, []);

  const handleAddShortcut = () => {
    if (newShortcut.name && newShortcut.url) {
      const updatedShortcuts = [...shortcuts, newShortcut];
      setShortcuts(updatedShortcuts);
      localStorage.setItem('userShortcuts', JSON.stringify(updatedShortcuts));
      setNewShortcut({ name: '', url: '' });
    }
  };

  const handleDeleteShortcut = (index: number) => {
    const updatedShortcuts = shortcuts.filter((_, i) => i !== index);
    setShortcuts(updatedShortcuts);
    localStorage.setItem('userShortcuts', JSON.stringify(updatedShortcuts));
  };

  return (
    <div className="glassmorphism p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Website Shortcuts</h2>
      <div className="flex flex-col items-center mb-4 space-y-2">
        <input
          type="text"
          value={newShortcut.name}
          onChange={(e) => setNewShortcut({ ...newShortcut, name: e.target.value })}
          className="w-full px-2 py-1 rounded bg-white bg-opacity-20 text-white"
          placeholder="Shortcut name"
        />
        <input
          type="text"
          value={newShortcut.url}
          onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })}
          className="w-full px-2 py-1 rounded bg-white bg-opacity-20 text-white"
          placeholder="URL"
        />
        <button
          onClick={handleAddShortcut}
          className="glassmorphism-button text-white px-4 py-1 rounded-lg w-full"
        >
          Add Shortcut
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="relative flex items-center">
            <a
              href={shortcut.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glassmorphism-button p-2 rounded-lg text-white text-center block w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-50"
            >
              {shortcut.name}
            </a>
            <button
              onClick={() => handleDeleteShortcut(index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white rounded-lg px-4 py-2 text-sm shadow-lg transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-40 hover:text-black"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortcutCard;
