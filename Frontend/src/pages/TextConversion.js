import React from 'react';
import HandwrittenTextEditor from '../components/font/HandwrittenTextConversion';

function TextConversion() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Document AddOns</h1>
      <HandwrittenTextEditor />
    </div>
  );
}

export default TextConversion;

