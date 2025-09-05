'use client';
import Image from 'next/image';
import type { CardTemplateProps } from './types';
import { cn } from '@/lib/utils';

export function ClassicTemplate({
  message,
  image,
  imageHint,
  teacherName,
  teacherImage,
  dept,
}: CardTemplateProps) {
  return (
    <div className="w-full h-full relative">
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={image}
            alt={imageHint || 'Background'}
            className="w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </div>
      )}

      {/* Teacher Photo and Text Overlay */}
      {teacherImage && teacherName && (
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10" style={{ transform: 'translateY(100px)' }}>
          {/* White Card Container - height extended to include text */}
          <div
            className="bg-white p-12 rounded-lg shadow-2xl flex flex-col items-center"
            style={{ height: '1500px', width: 'auto' }}
          >
            {/* Teacher Image */}
            <div className="mb-6">
              <Image
                src={teacherImage}
                alt={teacherName || 'Teacher'}
                width={1000}
                height={1150}
                className="object-contain rounded-lg"
                style={{ width: 'auto', height: '1150px' }}
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <h2 className="font-bold text-black mb-3" style={{ fontSize: '5em' }}>
                {teacherName}
              </h2>
              {(message || dept) && (
                <p className="text-black" style={{ fontSize: '3em' }}>
                  {[message, dept].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
