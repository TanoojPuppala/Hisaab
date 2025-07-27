import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Camera, Image } from "lucide-react";

const scanTips = [
  "Ensure good lighting.",
  "Keep receipt flat and visible.",
  "Avoid blurs and cuts.",
  "Capture the entire receipt.",
];

export default function UploadPage() {
  // Send image to ADK backend for receipt analysis here
  const handleUpload = (method: 'camera' | 'gallery') => {
    console.log(`Upload method: ${method}. Implement connection to ADK server here.`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="text-center">
        <h2 className="font-headline text-xl font-bold">Receipt Upload</h2>
        <p className="text-muted-foreground">Add a new receipt to your history.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
            <Button size="lg" className="w-full h-24 text-lg flex-col gap-2" onClick={() => handleUpload('camera')}>
                <Camera className="h-8 w-8" />
                <span>Take a Photo</span>
            </Button>
            <Button size="lg" variant="secondary" className="w-full h-24 text-lg flex-col gap-2" onClick={() => handleUpload('gallery')}>
                <Image className="h-8 w-8" />
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
    </div>
  );
}
