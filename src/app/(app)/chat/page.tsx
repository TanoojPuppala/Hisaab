"use client";

import { useState } from 'react';
import { Bot, Mic, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { financialInsightsChat } from '@/ai/flows/financial-insights-chat';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How can I help you with your finances today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const result = await financialInsightsChat({ query: currentInput, language });
      const aiResponse: Message = { id: Date.now() + 1, text: result.response, sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting financial insights:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get financial insights. Please try again.',
      });
       const aiResponse: Message = { id: Date.now() + 1, text: "Sorry, I couldn't process your request.", sender: 'ai' };
       setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMicClick = () => {
    setIsLanguageModalOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
        <div className="p-4 border-b">
            <h2 className="font-headline text-lg font-semibold">Smart Finance Assistant</h2>
        </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs rounded-lg px-4 py-3 text-sm ${
                  message.sender === 'user'
                    ? 'rounded-br-none bg-primary text-primary-foreground'
                    : 'rounded-bl-none bg-secondary'
                }`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <Avatar>
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="max-w-xs rounded-lg px-4 py-3 text-sm rounded-bl-none bg-secondary">
                <p className="animate-pulse">...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center gap-2 border-t p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask a financial question..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button size="icon" variant="ghost" onClick={handleMicClick} disabled={isLoading}>
          <Mic className="h-5 w-5" />
          <span className="sr-only">Voice Input</span>
        </Button>
        <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Send Message</span>
        </Button>
      </div>
      
      <Dialog open={isLanguageModalOpen} onOpenChange={setIsLanguageModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Choose Input Language</DialogTitle>
                <DialogDescription>
                    Select the language you want to speak in. The AI will translate and understand in real-time.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Select onValueChange={setLanguage} defaultValue={language}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                        <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <Button onClick={() => setIsLanguageModalOpen(false)}>Start Speaking</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
