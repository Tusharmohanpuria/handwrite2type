import React from 'react';
import DownloadPDF from '../components/common/DownloadPDF';

function Home() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-8">HandWrite2Type</h1>
      <DownloadPDF />
    </div>
  );
}

export default Home;

