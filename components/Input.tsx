import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-semibold text-slate-600 ml-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-lg font-medium text-slate-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 outline-none transition-all"
      />
    </div>
  );
};