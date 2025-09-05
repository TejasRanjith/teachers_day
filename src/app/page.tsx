'use client';

import { useState, useRef, type RefObject } from 'react';
import type { CardTemplateProps } from '@/components/festivio/templates/types';
import Header from '@/components/festivio/Header';
import { ControlPanel } from '@/components/festivio/ControlPanel';
import { CardPreview } from '@/components/festivio/CardPreview';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type FontOption = 'font-body' | 'font-serif' | 'font-sans';

export default function Home() {
  const [designation, setDesignation] = useState('Asst. Prof.');
  const [teacherName, setTeacherName] = useState<string | null>('Mr. Anderson');
  const [teacherImage, setTeacherImage] = useState<string | null>(null);
  const [dept, setDept] = useState<string | null>('CSE');

  const cardRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const resizeImage = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new (window as any).Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL(file.type));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleTeacherImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      resizeImage(file, (resizedDataUrl) => {
        setTeacherImage(resizedDataUrl);
      });
    }
  };


  const cardProps: CardTemplateProps = {
    message: designation,
    image: "/template.png",
    imageHint: 'Festive background',
    teacherName,
    teacherImage,
    dept,
  };

  const handleDownload = async (format: 'png' | 'pdf') => {
    if (!cardRef.current) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not find the card element to download.',
      });
      return;
    }

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: 3500,
        height: 2625,
      });

      if (format === 'png') {
        const data = canvas.toDataURL('image/png', 1.0); 
        const link = document.createElement('a');
        link.href = data;
        link.download = 'festivio-card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error generating canvas:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate the card image. Please try again.',
      });
    }
  };
  
  const handleShare = (platform: 'whatsapp' | 'email') => {
    const shareText = `Check out this card I made!`;
    const url = "https://festivio-app.com" // Placeholder URL
    let shareUrl = '';

    if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}`;
    } else if (platform === 'email') {
      shareUrl = `mailto:?subject=A card for you!&body=${encodeURIComponent(shareText + '\n\n' + url)}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };


  return (
    <div className="bg-background min-h-screen text-foreground font-body flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <ControlPanel
            designation={designation}
            setDesignation={setDesignation}
            teacherName={teacherName}
            setTeacherName={setTeacherName}
            dept={dept}
            setDept={setDept}
            handleTeacherImageUpload={handleTeacherImageUpload}
            handleDownload={handleDownload}
            handleShare={handleShare}
          />
        </div>
    <div 
      className="absolute opacity-0 pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: '3500px',
        height: '2625px',
        zIndex: -1
      }}
    >
      <CardPreview ref={cardRef} {...cardProps} />
    </div>
      </main>
    </div>
  );
}

