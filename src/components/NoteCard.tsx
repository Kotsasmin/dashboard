
import React, { useState, useEffect } from 'react';

const NoteCard: React.FC = () => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem('userNote');
    if (savedNote) setNote(savedNote);
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem('userNote', newNote);
  };

  return (
    <div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Quick Note</h2>
      <textarea
        value={note}
        onChange={handleNoteChange}
        className="w-full h-32 p-2 rounded-lg focus:outline-none"
        placeholder="Type your note here..."
      />
    </div>
  );
};

export default NoteCard;