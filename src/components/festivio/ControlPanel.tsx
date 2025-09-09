'use client';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Replaced custom Select with native select for better mobile UX
import { Download, FileText, FileImage, User } from 'lucide-react';

interface ControlPanelProps {
  designation: string;
  setDesignation: Dispatch<SetStateAction<string>>;
  teacherName: string | null;
  setTeacherName: Dispatch<SetStateAction<string | null>>;
  dept: string | null;
  setDept: Dispatch<SetStateAction<string | null>>;
  handleTeacherImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDownload: (format: 'png' | 'pdf') => void;
  hasImage?: boolean;
}

export function ControlPanel({
  designation,
  setDesignation,
  teacherName,
  setTeacherName,
  dept,
  setDept,
  handleTeacherImageUpload,
  handleDownload,
  hasImage = false,
}: ControlPanelProps) {
  return (
    <Card className="bg-card/80 border-border/50 sticky top-8">
      <CardHeader>
        <CardTitle className="font-headline text-accent">Customize Your Card</CardTitle>
        <CardDescription>Personalize every detail to make it perfect.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['item-1', 'item-4']} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-headline">Card Content</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <select
                  id="designation"
                  className="h-9 px-3 mx-4 text-sm w-56 sm:w-64 rounded-md border bg-background"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  <option value="" disabled>Select a designation</option>
                  <option value="HOD">HOD</option>
                  <option value="Principal">Principal</option>
                  <option value="Asst. Prof.">Asst. Prof.</option>
                  <option value="Assoc. Prof.">Assoc. Prof.</option>
                </select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="teacher-name">Teacher's Name</Label>
                <Input
                  id="teacher-name"
                  value={teacherName || ''}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="e.g., Mr. Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept">Department</Label>
                <Input
                  id="dept"
                  value={dept || ''}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="e.g., CSE"
                />
              </div>
               <div>
                <Label htmlFor="teacher-image-upload" className="mb-2 block">
                  Upload Teacher's Image
                </Label>
                <Button asChild variant="outline" className="w-full" disabled={hasImage}>
                  <label
                    htmlFor="teacher-image-upload"
                    className={hasImage ? "cursor-not-allowed opacity-60 pointer-events-none" : "cursor-pointer"}
                    aria-disabled={hasImage}
                    title={hasImage ? "Photo already uploaded" : undefined}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {hasImage ? "Photo uploaded" : "Choose teacher's photo"}
                    <input
                      id="teacher-image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={hasImage ? undefined as any : handleTeacherImageUpload}
                      disabled={hasImage}
                    />
                  </label>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-headline">Export</AccordionTrigger>
            <AccordionContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => handleDownload('png')}>
                        <FileImage className="mr-2 h-4 w-4" />
                        PNG
                    </Button>
                     <Button variant="outline" onClick={() => handleDownload('pdf')}>
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                    </Button>
                </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}
