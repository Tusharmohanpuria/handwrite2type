import React, { useState, useEffect, useRef } from 'react';

const FontPreview = ({ fontData, outputFilename }) => {
  const [text, setText] = useState('');
  const [loadedFont, setLoadedFont] = useState(null);
  const fontPreviewRef = useRef();

  useEffect(() => {
    if (fontData) {
      const fontUrl = URL.createObjectURL(fontData);
      const fontFace = new FontFace('customFont', `url(${fontUrl})`);
      fontFace.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        setLoadedFont('customFont');
      });
      return () => URL.revokeObjectURL(fontUrl);
    }
  }, [fontData]);

  const handleDownload = () => {
    const link = document.createElement('a');
    const fontUrl = URL.createObjectURL(fontData);
    link.href = fontUrl;
    link.download = `${outputFilename || 'font'}.ttf`;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(fontUrl);
  };

  return (
    <div className="bg-white">
      <h3 className="text-lg font-bold mb-2">Font Preview</h3>
      <div className="flex items-center mb-2">
        <textarea
          placeholder="Enter text to preview"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 resize-none"
          rows={3}
        />
      </div>
      <div
        ref={fontPreviewRef}
        style={{
          fontFamily: loadedFont,
          fontSize: '70px',
        }}
        className="font-preview p-4 overflow-auto"
      >
        {text}
      </div>
      {fontData && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleDownload}
        >
          Download Font
        </button>
      )}
    </div>
  );
};

export default FontPreview;

