import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, variant = 'primary', ...props 
}) => {
  const variants = {
    primary: 'bg-[#007BFF] text-white hover:opacity-90',
    secondary: 'bg-[#6C757D] text-white hover:opacity-90',
    danger: 'bg-[#DC3545] text-white hover:opacity-90',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100',
  };

  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};