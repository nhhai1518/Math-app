import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Sparkles } from 'lucide-react';
import { Operation, HistoryItem } from '../types';
import { explainMathOperation } from '../services/geminiService';
import { Button } from './Button';
import { Input } from './Input';

interface CalculatorProps {
  onCalculationComplete: (item: HistoryItem) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onCalculationComplete }) => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [lastOperation, setLastOperation] = useState<Operation | null>(null);
  
  // AI Explanation State
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  const handleCalculate = (op: Operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert("Vui lòng nhập hai số hợp lệ");
      return;
    }

    let res = 0;
    if (op === Operation.ADD) {
      res = n1 + n2;
    } else {
      res = n1 - n2;
    }

    setResult(res);
    setLastOperation(op);
    setExplanation(null); // Reset explanation on new calc

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      num1: n1,
      num2: n2,
      operation: op,
      result: res,
      timestamp: Date.now()
    };
    onCalculationComplete(newItem);
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setLastOperation(null);
    setExplanation(null);
  };

  const handleAskAI = async () => {
    if (result === null || lastOperation === null) return;
    
    setIsLoadingAI(true);
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    const text = await explainMathOperation(n1, n2, lastOperation, result);
    setExplanation(text);
    setIsLoadingAI(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input 
            label="Số thứ nhất (A)" 
            value={num1} 
            onChange={setNum1} 
            placeholder="Nhập số..."
          />
          <Input 
            label="Số thứ hai (B)" 
            value={num2} 
            onChange={setNum2} 
            placeholder="Nhập số..."
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => handleCalculate(Operation.ADD)}
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
          >
            Cộng
          </Button>
          <Button 
            onClick={() => handleCalculate(Operation.SUBTRACT)}
            variant="secondary"
            icon={<Minus className="w-5 h-5" />}
          >
            Trừ
          </Button>
        </div>

        {/* Reset */}
        <div className="flex justify-center">
            <button 
                onClick={handleReset}
                className="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1 transition-colors"
            >
                <RotateCcw className="w-3 h-3" /> Xóa nhập liệu
            </button>
        </div>

        {/* Result Area */}
        {result !== null && (
          <div className="mt-8 pt-6 border-t border-slate-100 animate-fade-in-up">
            <div className="text-center">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Kết quả</span>
              <div className="mt-2 text-5xl font-bold text-slate-800 tracking-tight">
                {result.toLocaleString('vi-VN')}
              </div>
            </div>

            {/* AI Explanation Section */}
            <div className="mt-6">
                {!explanation ? (
                    <button
                        onClick={handleAskAI}
                        disabled={isLoadingAI}
                        className="w-full py-2 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoadingAI ? (
                            <span>Đang suy nghĩ...</span>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Giải thích kết quả
                            </>
                        )}
                    </button>
                ) : (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-slate-700 text-sm leading-relaxed">
                                {explanation}
                            </p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
