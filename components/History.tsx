import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { HistoryItem, Operation } from '../types';

interface HistoryProps {
  items: HistoryItem[];
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({ items, onClear }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Lịch sử tính toán
        </h3>
        <button 
          onClick={onClear}
          className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
          title="Xóa lịch sử"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 font-mono text-slate-600">
              <span className="font-medium">{item.num1}</span>
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                item.operation === Operation.ADD 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {item.operation === Operation.ADD ? '+' : '-'}
              </span>
              <span className="font-medium">{item.num2}</span>
            </div>
            <div className="font-bold text-slate-800 text-lg">
              = {item.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};