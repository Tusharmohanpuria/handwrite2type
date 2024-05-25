import React, { useState } from 'react';
import axios from 'axios';

function HandwrittenTextEditor() {
  const [handwrittenTextDocument, setHandwrittenTextDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleHandwrittenTextUpload = (event) => {
    const selectedDocument = event.target.files[0];
    setHandwrittenTextDocument(selectedDocument);
  };

  const handleTextRecognition = async () => {
    setLoading(true);
    try {
      if (!handwrittenTextDocument) {
        setError('Please upload a document.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', handwrittenTextDocument);
      
      const response = await axios.post('http://127.0.0.1:5001/convert_pdf_to_docx', formData, {
        responseType: 'blob',
      });
      
      const docxUrl = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = docxUrl;
      a.download = 'recognized_text.docx';
      a.click();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error recognizing text. Please try again.');
      console.error('Error recognizing text:', error);
    }
  };

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      if (!handwrittenTextDocument) {
        setError('Please upload a document.');
        setLoading(false);
        return;
      }
  
      const formData = new FormData();
      formData.append('file', handwrittenTextDocument);
  
      const response = await axios.post('http://127.0.0.1:5002/summarize_document', formData, {
        responseType: 'blob',
      });

      const summaryUrl = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = summaryUrl;
      a.download = 'summary.pdf';
      a.click();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error generating summary. Please try again.');
      console.error('Error generating summary:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label htmlFor="handwrittenTextDocument" className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
        <input
          type="file"
          id="handwrittenTextDocument"
          onChange={handleHandwrittenTextUpload}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {handwrittenTextDocument && (
        <div className="flex">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleTextRecognition}
            disabled={loading}
          >
            {loading ? 'Recognizing Text...' : 'Convert to Doc'}
          </button>

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleGenerateSummary}
            disabled={loading}
          >
            {loading ? 'Generating Summary...' : 'Generate Summary'}
          </button>
        </div>
      )}
    </div>
  );
}

export default HandwrittenTextEditor;
