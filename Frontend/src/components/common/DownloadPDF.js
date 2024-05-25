import React from 'react';

function DownloadPDF() {
  const downloadTemplate = (template) => {
    window.open(template);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Download PDF Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300"
            onClick={() => downloadTemplate('/td.pdf')}
            onMouseEnter={() => document.getElementById('overlay-td').classList.add('opacity-100')}
            onMouseLeave={() => document.getElementById('overlay-td').classList.remove('opacity-100')}
          >
            Download Digital Template
          </button>
          <div className="preview-container relative overflow-hidden w-full md:w-80 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
            <img
              src="/td.png"
              alt="td.pdf preview"
              className="w-full object-cover transition duration-300 transform hover:scale-110"
            />
            <div
              id="overlay-td"
              className="overlay absolute inset-0 flex flex-col justify-center items-center rounded-lg bg-black bg-opacity-50 text-white opacity-0 transition duration-300"
            >
              <p className="text-xs text-gray-200 mb-1 italic">Digital use:</p>
              <p className="text-sm text-center">For touch screens and printing.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 transition duration-300"
            onClick={() => downloadTemplate('/tp.pdf')}
            onMouseEnter={() => document.getElementById('overlay-tp').classList.add('opacity-100')}
            onMouseLeave={() => document.getElementById('overlay-tp').classList.remove('opacity-100')}
          >
            Download Printable Template
          </button>
          <div className="preview-container relative overflow-hidden w-full md:w-80 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
            <img
              src="/tp.png"
              alt="tp.pdf preview"
              className="w-full object-cover transition duration-300 transform hover:scale-110"
            />
            <div
              id="overlay-tp"
              className="overlay absolute inset-0 flex flex-col justify-center items-center rounded-lg bg-black bg-opacity-50 text-white opacity-0 transition duration-300"
            >
              <p className="text-xs text-gray-200 mb-1 italic">For printing:</p>
              <p className="text-sm text-center">By taking photos from devices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadPDF;
