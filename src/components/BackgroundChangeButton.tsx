import React, { useState } from 'react';

interface BackgroundChangeButtonProps {
  setBackgroundImage: (url: string) => void;
}

const BackgroundChangeButton: React.FC<BackgroundChangeButtonProps> = ({ setBackgroundImage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {

      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setSelectedImage(null);
      } else {
        setError(null);
        setSelectedImage(file);
      }
    }
  };


  const handleSaveBackground = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBackgroundImage(base64String);


        localStorage.setItem('backgroundImage', base64String);
        setShowModal(false);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="glassmorphism-button bg-blue-500 bg-opacity-30 hover:bg-opacity-40 text-white px-4 py-2 rounded-lg text-sm"
      >
        Change Background
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-60 transition-all transform duration-300 scale-105">
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Upload a Custom Background</h2>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4 border rounded-lg p-2 w-full text-gray-600"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBackground}
                disabled={!selectedImage}
                className={`px-4 py-2 rounded-md text-white ${!selectedImage ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundChangeButton;
