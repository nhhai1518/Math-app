import React, { useState, useCallback } from 'react';
import { Calculator } from './components/Calculator';
import { History } from './components/History';
import { HistoryItem } from './types';

export default function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = useCallback((item: HistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 10)); // Keep last 10 items
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            <span className="text-primary-600">Vina</span>Math
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Công cụ tính toán Cộng & Trừ đơn giản
          </p>
        </div>

        {/* Main Calculator Card */}
        <Calculator onCalculationComplete={addToHistory} />

        {/* History Section */}
        {history.length > 0 && (
          <History items={history} onClear={clearHistory} />
        )}
        
        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 mt-12">
          <p>Được thiết kế với React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}