import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ModelRun {
  id: string;
  runId: string;
  providerSid: string;
  modelName: string;
  startDate: string;
  endDate: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}

interface SortConfig {
  key: keyof ModelRun | null;
  direction: 'asc' | 'desc';
}

const ModelRunsDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  // Sample data matching the Figma design
  const modelRuns: ModelRun[] = [
    {
      id: '1',
      runId: '7c030e5896303a24',
      providerSid: 'S0311772',
      modelName: 'ACU_XGBoost',
      startDate: '02/01/2025',
      endDate: '02/28/2025',
      accuracy: 83.87,
      precision: 44.44,
      recall: 100,
      f1Score: 61.54,
      auc: 97.22
    },
    {
      id: '2',
      runId: 'cf60269128195d44',
      providerSid: 'S0311772',
      modelName: 'ACU_XGBoost',
      startDate: '11/01/2024',
      endDate: '11/30/2024',
      accuracy: 81.82,
      precision: 33.33,
      recall: 100,
      f1Score: 50,
      auc: 90
    }
  ];

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return modelRuns;
    
    const searchTerms = searchTerm.toLowerCase().split(',').map(term => term.trim());
    return modelRuns.filter(run =>
      searchTerms.some(term =>
        run.runId.toLowerCase().includes(term) ||
        run.providerSid.toLowerCase().includes(term) ||
        run.modelName.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, modelRuns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: keyof ModelRun) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: keyof ModelRun) => {
    if (sortConfig.key !== key) {
      return <ChevronUpIcon className="w-3 h-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUpIcon className="w-3 h-3 text-gray-600" />
      : <ChevronDownIcon className="w-3 h-3 text-gray-600" />;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const PaginationButton: React.FC<{ 
    onClick: () => void; 
    disabled?: boolean; 
    children: React.ReactNode;
    variant?: 'icon' | 'number';
    active?: boolean;
  }> = ({ onClick, disabled, children, variant = 'icon', active = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center
        ${variant === 'number' && active 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-800">
          Acute Care Utilization Model Runs
        </h2>
      </div>

      {/* Search Section */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Search:</label>
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Comma separated Run IDs, Providers, or Model Names"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              {[
                { key: 'runId' as keyof ModelRun, label: 'Run ID' },
                { key: 'providerSid' as keyof ModelRun, label: 'Provider SID' },
                { key: 'modelName' as keyof ModelRun, label: 'Model Name' },
                { key: 'startDate' as keyof ModelRun, label: 'Start Date' },
                { key: 'endDate' as keyof ModelRun, label: 'End Date' },
                { key: 'accuracy' as keyof ModelRun, label: 'Accuracy (%)' },
                { key: 'precision' as keyof ModelRun, label: 'Precision (%)' },
                { key: 'recall' as keyof ModelRun, label: 'Recall (%)' },
                { key: 'f1Score' as keyof ModelRun, label: 'F1 Score (%)' },
                { key: 'auc' as keyof ModelRun, label: 'AUC (%)' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-2 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {getSortIcon(key)}
                  </div>
                </th>
              ))}
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-700 border border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((run) => (
              <tr key={run.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.runId}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.providerSid}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.modelName}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.startDate}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.endDate}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.accuracy}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.precision}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.recall}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.f1Score}</td>
                <td className="px-2 py-3 text-sm text-gray-900 border border-gray-200">{run.auc}</td>
                <td className="px-2 py-3 text-sm border border-gray-200">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Evaluations
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Results
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg">
        {/* First Page */}
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <ChevronLeftIcon className="w-4 h-4 -ml-2" />
        </PaginationButton>

        {/* Previous Page */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </PaginationButton>

        {/* Current Page */}
        <PaginationButton
          onClick={() => {}}
          variant="number"
          active={true}
        >
          {currentPage}
        </PaginationButton>

        {/* Next Page */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </PaginationButton>

        {/* Last Page */}
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="w-4 h-4" />
          <ChevronRightIcon className="w-4 h-4 -ml-2" />
        </PaginationButton>

        {/* Rows per page selector */}
        <div className="ml-4 flex items-center gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ModelRunsDashboard;