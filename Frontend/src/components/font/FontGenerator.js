import React, { useState } from 'react';
import axios from 'axios';
import FontPreview from './FontPreview';

function FontGenerator() {
  const [file, setFile] = useState(null);
  const [outputFilename, setOutputFilename] = useState('');
  const [family, setFamily] = useState('');
  const [style, setStyle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fontData, setFontData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'ttf'];
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      if (allowedExtensions.includes(extension)) {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Invalid file format. Please upload a PNG, JPG, JPEG, GIF, or TTF file.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('output_filename', outputFilename);
      formData.append('family', family);
      formData.append('style', style);

      const response = await axios.post('http://127.0.0.1:5000/generate_font', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      setLoading(false);
      setFontData(response.data);

    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.error || 'An error occurred while generating the font.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Generate Font</h2>
      <div className="mb-4">
        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="outputFilename" className="block text-sm font-medium text-gray-700 mb-2">Output Filename</label>
        <input
          type="text"
          id="outputFilename"
          placeholder="Output Filename"
          value={outputFilename}
          onChange={(e) => setOutputFilename(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="family" className="block text-sm font-medium text-gray-700 mb-2">Font Family Name</label>
        <input
          type="text"
          id="family"
          placeholder="Font Family Name"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
        <input
          type="text"
          id="style"
          placeholder="Font Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
        disabled={!file || loading}
      >
        Generate
      </button>
      {loading && <p className="mt-2">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {fontData && (
        <>
          <hr className="my-8" />
          <FontPreview fontData={fontData} outputFilename={outputFilename} />
        </>
      )}
    </div>
  );
}

export default FontGenerator;

