import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon,
  className = ''
}) => {
  const baseStyles = "relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-500/30 hover:shadow-primary-500/40 border border-transparent",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};