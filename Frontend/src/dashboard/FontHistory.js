import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FontDetails from './FontDetails';
import api from '../config/apiConfig';

function FontHistory() {
  const [fonts, setFonts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFont, setSelectedFont] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [fontName, setFontName] = useState('');
  const [fontDescription, setFontDescription] = useState('');
  const [isLibrarySelected, setIsLibrarySelected] = useState(true);

  useEffect(() => {
    // Fetch all fonts from backend when component mounts
    axios.get(api + '/fonts')
      .then(response => {
        setFonts(response.data);
      })
      .catch(error => {
        console.error('Error fetching fonts:', error);
      });
  }, []);

  const handleSearch = () => {
    // Filter fonts based on search term
    const filteredFonts = fonts.filter(font => {
      const nameMatch = font.font_name.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = font.description.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || descriptionMatch;
    });
    // Update state with filtered fonts
    setFonts(filteredFonts);
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
  };

  const handleFileChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!uploadFile) {
      console.error('No file selected');
      return;
    }
  
    // Create a new FileReader object to read the file
    const reader = new FileReader();
  
    // Define a function to handle file reading
    reader.onload = () => {
      // Convert the file to a base64 string
      const fileData = reader.result.split(',')[1]; // Split to remove the data URI prefix
  
      // Create an object containing font details and the base64 encoded file data
      const fontData = {
        font_name: fontName,
        description: fontDescription,
        font_file: fileData,
      };
  
      // Send POST request with fontData object
      axios.post(api + '/fonts/upload', fontData)
        .then(response => {
          console.log('Upload response:', response);
          // Refresh font list after upload
          axios.get(api + '/fonts') // Corrected endpoint URL
            .then(response => {
              setFonts(response.data);
              setUploadFile(null);
              setFontName('');
              setFontDescription('');
            })
            .catch(error => {
              console.error('Error fetching fonts:', error);
            });
        })
        .catch(error => {
          console.error('Error uploading font:', error);
        });
    };
  
    // Read the file as a data URL
    reader.readAsDataURL(uploadFile);
  };     

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Font Library</h2>
      <div className="mb-4 flex">
        <button
          className={`mr-2 px-4 py-2 rounded focus:outline-none ${isLibrarySelected ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setIsLibrarySelected(true)}
        >
          Font Library
        </button>
        <button
          className={`px-4 py-2 rounded focus:outline-none ${!isLibrarySelected ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setIsLibrarySelected(false)}
        >
          Upload Font
        </button>
      </div>
      {isLibrarySelected ? (
        <div>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
            <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {fonts.map((font, index) => (
                <li key={font.font_id} onClick={() => handleFontSelect(font)} className={`cursor-pointer rounded-lg py-4 px-6 ${index !== 0 ? 'mt-4' : ''} hover:bg-green-100`}>
                  <span className="text-xl font-semibold block">{font.font_name}</span>
                  <span className="text-gray-600 block">{font.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <input
              type="file"
              accept=".ttf"
              onChange={handleFileChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white mb-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fontName" className="block text-sm font-medium text-gray-700 mb-2">Font Name</label>
            <input
              type="text"
              id="fontName"
              placeholder="Font Name"
              value={fontName}
              onChange={(e) => setFontName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fontDescription" className="block text-sm font-medium text-gray-700 mb-2">Font Description</label>
            <input
              type="text"
              id="fontDescription"
              placeholder="Font Description"
              value={fontDescription}
              onChange={(e) => setFontDescription(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          </div>
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Font
          </button>
        </>
      )}
      {selectedFont && isLibrarySelected && <FontDetails font={selectedFont} onClose={() => setSelectedFont(null)} />}
    </div>
  );
}

export default FontHistory;

