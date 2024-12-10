import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  compact?: boolean;
}

export function CategoryCard({ icon: Icon, title, description, onClick, compact = false }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left group",
        compact ? "p-4" : "p-6"
      )}
    >
      <div className={clsx(
        "flex items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-500 transition-colors",
        compact ? "w-8 h-8" : "w-12 h-12"
      )}>
        <Icon className={clsx(
          "text-purple-600 group-hover:text-white transition-colors",
          compact ? "w-4 h-4" : "w-6 h-6"
        )} />
      </div>
      <h3 className={clsx(
        "font-semibold text-gray-900",
        compact ? "mt-2 text-base" : "mt-4 text-lg"
      )}>{title}</h3>
      {!compact && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </button>
  );
}