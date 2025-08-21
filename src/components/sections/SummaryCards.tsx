'use client';

import React from 'react';
import { SummaryCard as SummaryCardType } from '@/types/history';

interface SummaryCardsProps {
  data: SummaryCardType[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {data.map((card, index) => (
        <div
          key={index}
          className="relative rounded-2xl p-6 text-center"
          style={{
            background: card.bgGradient,
            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {card.value}
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-1">
            {card.title}
          </div>
          <div className="text-sm text-gray-600">
            {card.description}
          </div>
        </div>
      ))}
    </div>
  );
};
