'use client';
import React from 'react';
import type { CardTemplateProps } from './templates/types';
import { ClassicTemplate } from './templates/ClassicTemplate';

export const CardPreview = React.forwardRef<HTMLDivElement, CardTemplateProps>(
  (props, ref) => {
      return (
    <div className="flex flex-col items-center" style={{ width: '3500px', height: '2625px' }}>
      <div
        ref={ref}
        className="bg-card shadow-2xl transition-all duration-300 ease-in-out"
        style={{
          width: '3500px',
          height: '2625px',
        }}
      >
        <ClassicTemplate {...props} />
      </div>
    </div>
  );
  }
);

CardPreview.displayName = 'CardPreview';
