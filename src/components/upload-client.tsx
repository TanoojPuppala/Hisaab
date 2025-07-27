"use client";

import React, { useRef, useState, useEffect } from 'react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

const scanTips = [
  "Ensure good lighting.",
  "Keep receipt flat and visible.",
  "Avoid blurs and cuts.",
  "Capture the entire receipt.",
];

export default function UploadClient() {
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeReceiptOutput | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not available.');
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, []);

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

  const handleDone = () => {
    if (analysisResult) {
      const storedHistory = JSON.parse(localStorage.getItem('receiptHistory') || '[]');
      const newHistoryItem = {
        id: Date.now(),
        ...analysisResult,
        category: 'Uncategorized' // Default category
      };
      const updatedHistory = [newHistoryItem, ...storedHistory];
      localStorage.setItem('receiptHistory', JSON.stringify(updatedHistory));
      setAnalysisResult(null);
    }
    setIsResultModalOpen(false);
    toast({
      title: 'Success!',
      description: 'Your receipt has been added to your history.',
    });
    router.push('/history');
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
            <video ref={videoRef} className="w-full aspect-video rounded-md bg-secondary" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access to use the photo feature. You can still upload from your gallery.
                  </AlertDescription>
                </Alert>
            )}
            <Button size="lg" className="w-full h-24 text-lg flex-col gap-2" onClick={() => handleUpload('camera')} disabled={isLoading || hasCameraPermission === false}>
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
            <Button onClick={handleDone}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
