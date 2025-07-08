import React from 'react';
import ModelRunsDashboard from './ModelRunsDashboard';

const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Healthcare ML Dashboard Demo
          </h1>
          <p className="text-gray-600">
            This demo showcases the Model Runs Dashboard component based on the Figma design.
          </p>
        </div>
        
        <ModelRunsDashboard />
        
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features Implemented</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Multi-field search functionality (Run IDs, Providers, Model Names)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Sortable columns with visual indicators
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Pagination with configurable page sizes
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Responsive table layout
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Action buttons for evaluations and results
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Exact visual match to Figma design
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;