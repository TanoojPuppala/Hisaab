"use client";

import { useState } from 'react';
import { Bot, Mic, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

  // Post AI chat input to ADK GPT-based financial assistant
  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse: Message = { id: Date.now() + 1, text: `I've received your query about "${input}". Here are some insights...`, sender: 'ai' };
        setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
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
        </div>
      </ScrollArea>
      <div className="flex items-center gap-2 border-t p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask a financial question..."
          className="flex-1"
        />
        <Button size="icon" variant="ghost" onClick={handleMicClick}>
          <Mic className="h-5 w-5" />
          <span className="sr-only">Voice Input</span>
        </Button>
        <Button size="icon" onClick={handleSendMessage}>
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
                <Select>
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
