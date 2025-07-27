"use client";

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Camera, Image, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { analyzeReceipt, AnalyzeReceiptOutput } from '@/ai/flows/receipt-analysis';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const scanTips = [
  "Ensure good lighting.",
  "Keep receipt flat and visible.",
  "Avoid blurs and cuts.",
  "Capture the entire receipt.",
];

export default function UploadPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeReceiptOutput | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImage(file);
    }
  };

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setIsLoading(true);
      try {
        const result = await analyzeReceipt({ photoDataUri: dataUri });
        setAnalysisResult(result);
        setIsResultModalOpen(true);
      } catch (error) {
        console.error('Error analyzing receipt:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not analyze the receipt. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleUpload = (method: 'camera' | 'gallery') => {
    if (fileInputRef.current) {
      if (method === 'camera') {
        fileInputRef.current.setAttribute('capture', 'environment');
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*"
      />
      <div className="text-center">
        <h2 className="font-headline text-xl font-bold">Receipt Upload</h2>
        <p className="text-muted-foreground">Add a new receipt to your history.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
            <Button size="lg" className="w-full h-24 text-lg flex-col gap-2" onClick={() => handleUpload('camera')} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : <Camera className="h-8 w-8" />}
                <span>Take a Photo</span>
            </Button>
            <Button size="lg" variant="secondary" className="w-full h-24 text-lg flex-col gap-2" onClick={() => handleUpload('gallery')} disabled={isLoading}>
                 {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> :  <Image className="h-8 w-8" />}
                <span>Upload from Gallery</span>
            </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Tips for a better scan</CardTitle>
          <CardDescription>Follow these tips to ensure accurate analysis by our AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {scanTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
       <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receipt Analysis Result</DialogTitle>
            <DialogDescription>
              Here's what we extracted from your receipt.
            </DialogDescription>
          </DialogHeader>
          {analysisResult && (
            <div className="py-4 space-y-2">
              <p><strong>Vendor:</strong> {analysisResult.vendor}</p>
              <p><strong>Date:</strong> {analysisResult.date}</p>
              <p><strong>Amount:</strong> {analysisResult.amount} {analysisResult.currency}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsResultModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
