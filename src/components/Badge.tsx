import React from 'react';

interface BadgeProps {
  badge?: string;
}

const Badge: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <div>
      {badge && (
        <div className='flex items-center gap-2 mb-2'>
          <div className='w-5 h-10 bg-red-500 rounded-sm' />
          <span className='text-base font-semibold text-secondary-bg-2'>{badge}</span>
        </div>
      )}
    </div>
  );
};

export default Badge;

