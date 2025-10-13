'use client';

import React from 'react';
import { SummaryCard as SummaryCardType } from '@/types/history';

interface SummaryCardsProps {
  data: SummaryCardType[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {data.map((card, index) => (
        <div
          key={index}
          className="relative rounded-2xl p-4 sm:p-6 text-center table-shadow"
          style={{
            background: card.bgGradient
          }}
        >
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
            {card.value}
          </div>
          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mb-1">
            {card.title}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            {card.description}
          </div>
        </div>
      ))}
    </div>
  );
};
