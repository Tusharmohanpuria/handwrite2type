import React, { useState, useEffect } from 'react';

function FontDetails({ font, onClose }) {
  const [text, setText] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [loadedFont, setLoadedFont] = useState(null);

  useEffect(() => {
    if (font.font_file) {
      loadFont(font.font_file);
    }
  }, [font]);

  const loadFont = (fontFile) => {
    const fontBlob = new Blob([Uint8Array.from(fontFile.data)], { type: 'font/ttf' });
    const fontUrl = URL.createObjectURL(fontBlob);
    const fontFace = new FontFace('customFont', `url(${fontUrl})`);
    fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      setLoadedFont('customFont');
    });
    return () => URL.revokeObjectURL(fontUrl);
  };

  const handleDownload = () => {
    const fontBlob = new Blob([Uint8Array.from(font.font_file.data)], { type: 'font/ttf' });
    const fontUrl = URL.createObjectURL(fontBlob);
    const link = document.createElement('a');
    link.href = fontUrl;
    link.download = `${font.font_name}.ttf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fontUrl);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePreview = () => {
    setPreviewText(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Font Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div>
        <span className="text-lg font-semibold">{font.font_name}</span>
        <span className="text-sm text-gray-500 ml-2">{font.description}</span>
      </div>
      {/* Font preview */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Enter text for preview"
          value={text}
          onChange={handleTextChange}
          className="flex-grow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button onClick={handlePreview} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Preview
        </button>
      </div>
      {previewText && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-lg p-4 overflow-auto" style={{ fontFamily: loadedFont, minHeight: '120px' }}>
            <p className="text-8xl text-gray-700">{previewText}</p>
          </div>
        </div>
      )}
      {/* Download option */}
      <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Download
      </button>
    </div>
  );
}

export default FontDetails;

