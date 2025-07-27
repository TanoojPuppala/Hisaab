"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BrainCircuit, Globe, Languages, ShieldCheck, TrendingUp } from 'lucide-react';
import { IndianRupee } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-12 w-12 text-primary" />,
    title: 'AI-Powered Analysis',
    description: 'Get smart insights from your receipts automatically.',
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: 'Secure & Private',
    description: 'Your financial data is encrypted and protected.',
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
    title: 'Smart Tracking',
    description: 'Monitor your spending and budget effortlessly.',
  },
  {
    icon: <Languages className="h-12 w-12 text-primary" />,
    title: 'Local Language Support',
    description: 'Use the app in your preferred language.',
  },
];

export default function FeatureIntro() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border-[10px] border-gray-800 bg-background shadow-2xl">
        <div className="absolute left-1/2 top-2 h-4 w-28 -translate-x-1/2 rounded-full bg-gray-800"></div>
        <div className="flex h-[80vh] flex-col justify-between">
          <header className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-8 w-8 text-primary" />
              <h1 className="font-headline text-3xl font-bold">Hisaab.ai</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Choose Language</span>
            </Button>
          </header>

          <div className="flex-grow px-2">
            <Carousel className="w-full">
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="bg-card/80">
                        <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                          {feature.icon}
                          <h3 className="font-headline text-xl font-semibold">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          <footer className="space-y-3 p-6">
            <Button asChild size="lg" className="w-full font-bold">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full font-bold">
              <Link href="/register">Register</Link>
            </Button>
          </footer>
        </div>
      </div>
    </main>
  );
}
