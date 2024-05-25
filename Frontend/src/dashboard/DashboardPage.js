import React from 'react';
import FontHistory from './FontHistory';

function DashboardPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Font Dashboard</h1>
      <FontHistory />
    </div>
  );
}

export default DashboardPage;

