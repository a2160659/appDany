import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md p-6 border border-gray-200',
        hover && 'transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

